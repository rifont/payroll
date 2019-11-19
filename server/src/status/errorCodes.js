class HTTPError extends Error {
  constructor(message, status) {
    super();
    this.status = status;
    this.data = { message };
  }
}

export class BadRequestError extends HTTPError {
  constructor(message) {
    super(message, 400);
  }
}

export class ServerError extends HTTPError {
  constructor(message) {
    super(message, 500);
  }
}
