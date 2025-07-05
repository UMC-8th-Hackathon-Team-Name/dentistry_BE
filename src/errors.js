export class DuplicateUserEmailError extends Error {
  errorCode = "001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
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
