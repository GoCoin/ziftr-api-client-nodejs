# GoPayWin API Client for Node.js

This branch is under active development. For more information please visit: [www.gopaywinpay.com](http://www.gopaywin.com/)

[![@gopaywin on Twitter](http://img.shields.io/badge/twitter-%40gopaywin-blue.svg?style=flat)](https://twitter.com/gopaywin)
[![GoPayWin on NPM](https://img.shields.io/npm/v/gopaywin-api-client.svg)](https://www.npmjs.com/package/gopaywin-api-client)


## Installation

```
npm install --save gopaywin-api-client
```


## Usage
The following call will fetch all orders for the API keys' owner. Be sure to pass configuration data as shown.
```
var api = require('gopaywin-api-client');
var configuration = {
  "keys": {
    "publishable_key" : "...",
    "private_key"     : "..."
  },
  "api_version": "0.1",
  "api_host": "https://sandbox.fpa.bz/"
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

* [GoPayWin website](http://www.gopaywinpay.com/)
