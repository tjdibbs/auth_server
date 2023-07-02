const { STATUS } = require("../lib/constants");

class CustomError extends Error {
  /**
   *
   * @param {string} message
   * @param {number} status
   */
  constructor(message, status = 500) {
    super(message);
    this.name = STATUS[status];
    this.statusCode = status;
    this.errorMessage = message;
  }
}

module.exports = CustomError;
