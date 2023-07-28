class GenericError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ServiceError extends GenericError {
  constructor(message) {
    super(message, 400);
  }
}
export class NotfoundError extends GenericError {
  constructor(message) {
    super(message, 404);
  }
}
export class ValidationError extends GenericError {
  constructor(message) {
    super(message, 403);
  }
}
export class AuthError extends GenericError {
  constructor(message) {
    super(message, 401);
  }
}
