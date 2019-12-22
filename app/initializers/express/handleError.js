import {
  ApiServerError,
  ApiUnauthorizedError,
  ApiBadRequestError,
  ApiForbiddenError,
  ApiMethodNotAllowedError,
  ApiNotAcceptableError,
  ApiNotFoundError
} from 'modules/apiError';
import pe from 'initializers/prettyError';

class HandleError {
  static handleError(err, req, res, next) {
    console.error(pe.render(err));

    // Handling internal errors.

    if (err instanceof ApiServerError) {
      return res.status(500).send({ message: err.message, status: 500 });
    }
    if (
      err instanceof ApiUnauthorizedError ||
      err.name === 'ApiUnauthorizedError'
    ) {
      return res.status(401).send({ message: err.message, status: 401 });
    }

    if (
      err instanceof ApiBadRequestError ||
      err.name === 'ApiBadRequestError'
    ) {
      return res.status(400).send({ message: err.message, status: 400 });
    }

    if (err instanceof ApiForbiddenError || err.name === 'ApiForbiddenError') {
      return res.status(403).send({ message: err.message, status: 403 });
    }

    if (
      err instanceof ApiMethodNotAllowedError ||
      err.name === 'ApiMethodNotAllowedError'
    ) {
      return res.status(405).send({ message: err.message, status: 405 });
    }

    if (err instanceof ApiNotFoundError || err.name === 'ApiNotFoundError') {
      return res.status(404).send({ message: err.message, status: 404 });
    }

    if (
      err instanceof ApiNotAcceptableError ||
      err.name === 'ApiNotAcceptableError'
    ) {
      return res.status(406).send({ message: err.message, status: 406 });
    }

    if (
      err.name == 'UnauthorizedError' &&
      err.inner.name == 'JsonWebTokenError'
    ) {
      return res.status(401).send({ 'token error': err.message, status: 401 });
    }

    // Handling dependencies errors.
    if (err.status == 400 || err.type == 'entity.parse.failed') {
      return res
        .status(err.status)
        .send({ message: 'Bad Request', status: 400 });
    }

    if (err.code == 'credentials_required') {
      return res
        .status(err.status)
        .send({ message: err.message, status: err.status });
    }

    return res.status(500).send({
      message:
        "Veuillez contacter un administrateur via ticket s'il vous plaît.",
      status: 500
    });
  }
}

export default HandleError;
