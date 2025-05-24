class Api404Error extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'Api404Error';
    this.statusCode = 404;
  }
}

module.exports = Api404Error;