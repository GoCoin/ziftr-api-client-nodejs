var chai = require('chai');
var should = require('chai').should();
var api = require('../index');
var configuration = require('../configuration');

describe('validate api endpoints', function() {

  var order_id;

  it('gets orders', function(done){
    api.get("orders", configuration)
      .then(function(response){
        (response).should.have.property('statusCode');
        (response.statusCode).should.equal(200);
        (response).should.have.property('body');
        (response.body).should.have.property('orders');

        // we may not have any orders. but if we do, test that we get data
        if(response.body.orders.length > 0) {
          (response.body.orders[0]).should.have.property('order');
          (response.body.orders[0].order).should.have.property('id');
          (response.body.orders[0].order).should.have.property('seller_account_id');
        }
      })
      .then(done)
      .catch(done);
  });

  it('creates an order', function(done){
    api.post("orders", api.merge_options(configuration, {
      data: {
        order: {
          currency_code: "USD"
        }
      }
    }))
    .then(function(post_response){
      (post_response).should.have.property('statusCode');
      (post_response.statusCode).should.equal(201);
      (post_response).should.have.property('body');

      (post_response.body).should.have.property('order');
      (post_response.body.order).should.have.property('id');
      order_id = post_response.body.order.id;
    })
    .then(done)
    .catch(done);

  });

  it('changes an order', function(done){
    api.patch("orders/" + order_id, api.merge_options(configuration, {
      data: {
        order: {
          currency_code: "LTC"
        }
      }
    }))
    .then(function(patch_response){
      (patch_response).should.have.property('statusCode');
      (patch_response.statusCode).should.equal(200);
      (patch_response).should.have.property('body');

      (patch_response.body).should.have.property('order');
      (patch_response.body.order).should.have.property('id');
      (patch_response.body.order.id).should.equal(order_id);
      (patch_response.body.order).should.have.property('currency_code');
      (patch_response.body.order.currency_code).should.equal("LTC");

    })
    .then(done)
    .catch(done);

  });

  it('attempts to delete an order', function(done){

    api.delete("orders/" + order_id, configuration)
    .then(done)
    .catch(function(ex){
      (ex).should.have.property('name');
      (ex.name).should.equal('NotFoundException');
      done();
    });

  });

});