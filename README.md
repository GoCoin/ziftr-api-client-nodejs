# ziftr-api-client-nodejs

This branch is under active development and should not be considered stable for use in production systems. For more information please visit: [www.ziftrpay.com](http://www.ziftrpay.com/)

[![@awsforphp on Twitter](http://img.shields.io/badge/twitter-%40ziftrapi-blue.svg?style=flat)](https://twitter.com/ziftrapi)

## Installation

```
npm install ziftr-api-client-nodejs
```

## Configuration

Modify configuration.js to define host and key information:

```javascript
{
  "keys": {
    "publishable_key": "",
    "private_key": ""
  },
  "api_version": "0.1",
  "client_version": "0.1.0a",
  "api_host": "http://sandbox.fpa.bz/"
}
```

## Usage
The following call will fetch all orders for the API keys' owner:
```
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
