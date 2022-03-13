class BaseModel {
  constructor(message, result) {
    if (result) {
      this.result = result;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(message, result) {
    super(message, result);
    this.code = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(message, code) {
    super(message);
    if (!code) {
      this.code = 500;
      return;
    }
    this.code = code;
  }
}

module.exports = { SuccessModel, ErrorModel };
