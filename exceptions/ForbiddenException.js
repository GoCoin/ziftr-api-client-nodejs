var BaseException = require('./BaseException');

module.exports = function ForbiddenException(configuration, message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message.error.message;
  this.configuration = configuration;
  this.fields = message.error.fields;
  this.code = 403;
};

require('util').inherits(module.exports, BaseException);
