class BaseError {
  constructor(message, code, status) {
    this.isBaseError = true;
    this.message = message;
    this.code = code;
    this.status = status;
  }
}

module.exports = BaseError;
