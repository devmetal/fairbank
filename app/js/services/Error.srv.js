'use strict';

class ErrorService {
  constructor() {
    this.msg = '';
  }

  setMessage(msg) {
    this.msg = msg;
  }

  getMessage() {
    return this.msg;
  }
}

module.exports = ErrorService;
