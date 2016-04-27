# ziftr-api-client-nodejs

This branch is under active development and should not be considered stable for use in production systems. For more information please visit: [www.ziftrpay.com](http://www.ziftrpay.com/)

[![@awsforphp on Twitter](http://img.shields.io/badge/twitter-%40ziftrapi-blue.svg?style=flat)](https://twitter.com/ziftrapi)
[![@awsforphp on Twitter](https://img.shields.io/npm/v/ziftr-api-client-nodejs.svg)](https://www.npmjs.com/package/ziftr-api-client-nodejs)


## Installation

```
npm install ziftr-api-client-nodejs
# or
npm install --save git+ssh://git@github.com:GoCoin/ziftr-api-client-nodejs.git
```


## Usage
The following call will fetch all orders for the API keys' owner. Be sure to pass configuration data as shown.
```
var api = require('ziftr-api-client-nodejs');
var configuration = {
  "keys": {
    "publishable_key" : "",
    "private_key"     : ""
  },
  "api_version": "0.1",
  "api_host": "http://sandbox.fpa.bz/"
}

api.get("orders", configuration)
  .then(function(response){
    console.log(response.body.orders);
  })
  .catch(function(error){
    console.log(error);
  });
```

## Links

* [Ziftr API Client for NodeJS on Github](http://github.com/ziftr/ziftr-api-client-nodejs/)
* [Ziftr website](http://www.ziftr.com/)
* [ZiftrPAY website](http://www.ziftrpay.com/)
