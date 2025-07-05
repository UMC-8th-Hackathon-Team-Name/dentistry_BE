export class DuplicateUserEmailError extends Error {
  errorCode = "001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class UserNotFoundError extends Error {
    errorCode = "U001";

    constructor(reason) {
        super(reason);
        this.reason = reason;
        this.statusCode = 400;
    }
}

export class StationNotFoundError extends Error {
  errorCode = "S001";
  statusCode = 404;
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class ServerError extends Error {
    errorCode = "C001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
        this.statusCode = 500;
    }
}