const errorCode = {
  // Internal Server Error
  a000: 'An error occured on server side',

  // Unauthorized error
  b000: 'Unauthorized user',

  // Bad Request Error
  c000: 'Bad request',
  c010: 'Seuls les documents au format pdf sont acceptés pour le moment',
  c011: 'Filename not specified',

  // Forbidden Error
  d000: 'Forbidden',

  // Method Not Allowed Error
  e000: 'Method not allowed',

  // Not Acceptable Error
  f000: 'Not acceptable',

  // Not Found
  g000: 'Document not found for this id'
};

class ErrorReplica {
  constructor(message) {
    this.name = 'ErrorReplica';
    this.message = message;
    this.stack = new Error().stack;
  }
}
ErrorReplica.prototype = Object.create(Error.prototype);

class ApiError extends ErrorReplica {
  constructor(message, status) {
    super(message);

    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

class TemplateError extends ApiError {
  constructor(message) {
    super(
      message || 'This is a template error, please not use in any situation.'
    );
    this.name = 'TemplateError';
  }
}

class ApiServerError extends ApiError {
  constructor(message) {
    super(message || errorCode['a000']);
    this.name = 'ApiServerError';
  }
}

class ApiUnauthorizedError extends ApiError {
  constructor(message) {
    super(message || errorCode['b000']);
    this.name = 'ApiUnauthorizedError';
  }
}

class ApiBadRequestError extends ApiError {
  constructor(message) {
    super(message || errorCode['c000']);
    this.name = 'ApiBadRequestError';
  }
}

class ApiForbiddenError extends ApiError {
  constructor(message) {
    super(message || errorCode['d000']);
    this.name = 'ApiForbiddenError';
  }
}

class ApiMethodNotAllowedError extends ApiError {
  constructor(message) {
    super(message || errorCode['e000']);
    this.name = 'ApiMethodNotAllowedError';
  }
}

class ApiNotAcceptableError extends ApiError {
  constructor(message) {
    super(message || errorCode['f000']);
    this.name = 'ApiNotAcceptableError';
  }
}

class ApiNotFoundError extends ApiError {
  constructor(message) {
    super(message || errorCode['g000']);
    this.name = 'ApiNotFoundError';
  }
}

export default ApiError;
export {
  TemplateError,
  ApiServerError,
  ApiUnauthorizedError,
  ApiBadRequestError,
  ApiForbiddenError,
  ApiMethodNotAllowedError,
  ApiNotAcceptableError,
  ApiNotFoundError
};
