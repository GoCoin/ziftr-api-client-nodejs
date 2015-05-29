var Promise = require('bluebird');

var chai = require('chai');
var expect = chai.expect;

var ziftr_api_client_node = require('../index');
var api_get = ziftr_api_client_node.get;

describe('#get', function() {

  it('successfully hits route', function(done) {
    api_get('orders/')
      .then(function(response){
        expect(response).to.have.property('body');
        expect(response.body).to.not.equal(null);
        expect(response).to.not.have.property('error');
      })
      .then(done)
      .catch(done);

  });

});