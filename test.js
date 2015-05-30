var api = require('./index.js');

var configuration = {
  keys: {
    pub: 'pub_9bf66aeef23b99a081f12ae6cd98052a',
    prv: 'prv_a95f6c5eaba704de843c7c058e2a1089677dd63fd77e2cd63fc522a2a8324e27'
  },
  api_version: '0.1',
  client_version: '0.1.0a',
  api_host: 'http://sandbox.fpa.loc:3000/'
};



api.get("orders", configuration)
  .then(function(response){
    console.log('########### API GET: /orders ##############');
    console.log("# Orders for this seller: " + JSON.parse(response.body).orders.length);
  })
  .then(function(){
    console.log('########### API POST: /orders ##############');
    return api.post("orders", api.merge_options(configuration, {
      data: {
        order: {
          currency_code: "USD"
        }
      }
    }));
  })
  .then(function(post_response){
    var post_data = JSON.parse(post_response.body);
    console.log(post_data);
    return api.patch("orders/" + post_data.order.id, api.merge_options(configuration, {
      data: {
        order: {
          currency_code: 'LTC'
        }
      }
    }));
  })
  .then(function(order_patch_response){
    console.log('########### API PATCH: /orders/:id ##############');
    var patch_data = JSON.parse(order_patch_response.body);
    console.log(patch_data);
  })
  .catch(function(error){
    console.log(error);
  });
