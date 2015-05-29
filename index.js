var request = require('request-promise');
var SHA256 = require('crypto-js/sha256');
var HMAC_SHA256 = require('crypto-js/hmac-sha256');

var API_VERSION = '0.1';
var CLIENT_VERSION = '0.1.0a';
var API_HOST =  "http://sandbox.fpa.loc:8080/";

var pub_key = 'pub_9bf66aeef23b99a081f12ae6cd98052a';
var prv_key = 'prv_a95f6c5eaba704de843c7c058e2a1089677dd63fd77e2cd63fc522a2a8324e27';

function getSignature(path, pub, prv, qs) {
  if(!prv.length) {
    return '';
  }

  var timestamp = Date.now().toString(16);

  var text_to_sign  = '';
  text_to_sign += timestamp;
  text_to_sign += pub;
  text_to_sign += path;
  text_to_sign += qs;
  var hashKey  = SHA256(prv);

  // Sign the text
  return timestamp + '/' + HMAC_SHA256(text_to_sign, hashKey);
}

function string_to_base64(string){
  return (new Buffer(string)).toString('base64');
}

module.exports = {
  get: function(html) {

    var accept_version = API_VERSION.replace('.','-');
    var qs = html.split('?').length > 1 ? html.split('?')[1] : '';

    var request_headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.ziftr.fpa-' + accept_version + '+json',
      'Authorization': 'Basic ' + string_to_base64(pub_key + ':' + getSignature(API_HOST + html, pub_key, prv_key, qs))
    };

    console.log(request_headers);

    return request({
        method: "POST",
        uri: API_HOST,// + html,
        headers: request_headers
      })
      .then(function(response){
        return { body: response };
      })
      .catch(function(error){
        console.log(error);
        return { error: error };
      });
  }

};
