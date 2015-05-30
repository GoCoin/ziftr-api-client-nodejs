var request = require('request-promise');
var crypto = require('crypto');
var Promise = require('bluebird');

module.exports = {
  get: function(html, options) {
    return api_request("GET", html, options);
  },

  post: function(html, options) {
    return api_request("POST", html, options);
  },

  patch: function(html, options) {
    return api_request("PATCH", html, options);
  },

  delete: function(html, options) {
    return api_request("DELETE", html, options);
  },

  /**
   *
   * Acquired from SO: http://stackoverflow.com/a/171256
   *
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
  merge_options: function (obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }

};


function getSignature(path, pub, prv, qs) {
  if(!prv.length) {
    return '';
  }

  if(qs === undefined || qs.length === 0) {
    qs = '';
  }

  // Calculate text to sign
  var timestamp = Math.floor(new Date().getTime() / 1000).toString(16);

  var toHash = timestamp + pub + '/' + path + qs;

  var sha256 = crypto.createHash('sha256');
  var hashKey  = sha256.update(prv).digest('hex');
  var hmac = crypto.createHmac('sha256', hashKey);

  // Sign the text
  return timestamp + '/' + hmac.update(toHash).digest('hex');
}

function string_to_base64(string){
  return (new Buffer(string)).toString('base64');
}

function validate_options(options) {

  // validate that options is present
  if(options === undefined || !options) {
    console.log("Error: Configuration options are not set");
    return false;
  }

  // validate that the pub and prv keys are present
  if(options.keys === undefined || options.keys.pub === undefined || options.keys.prv === undefined) {
    console.log('Error: Keys are missing');
    return false;
  }

  // validate that the host version and client version is set, and that we have an api_host
  if(options.api_version === undefined) {
    console.log("Error: api version is not set");
    return false;
  }
  if(options.client_version === undefined) {
    console.log("Error: client version is not set");
    return false;
  }
  if(options.api_host === undefined) {
    console.log("Error: api host is not set");
    return false;
  }

  return true;
}

function api_request(method, html, options) {

  return Promise.resolve()
  .then(function(){

    // validate that the method is specified
    if(method === undefined) {
      console.log('Error: No HTTP method specified');
      return false;
    }

    if(!validate_options(options)) {
      return false;
    }

    var accept_version = options.api_version.replace('.','-');
    var html_parts = html.split('?');
    var qs = html_parts.length > 1 ? html_parts[1] : '';
    var path = html_parts.length > 1 ? html_parts[0] + '?' : html_parts[0];
    var signature = getSignature(path, options.keys.pub, options.keys.prv, qs);

    var request_headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.ziftr.fpa-' + accept_version + '+json',
      'Authorization': 'Basic ' + string_to_base64(options.keys.pub + ':' + signature),
      'User-Agent': 'Ziftr%20API%20Javascript%20Client%20'+ options.client_version
    };

    // construct the request object
    var request_obj = {
      method: method,
      uri: options.api_host + html,
      headers: request_headers
    };

    // include request data
    if(options.data !== undefined) {
      request_obj.body = JSON.stringify(options.data);
    }

    // make our request and return as a promise
    return request(request_obj)
      .then(function(response){
        return { body: response };
      })
      .catch(function(error){
        return { error: error };
      });
  });
}

