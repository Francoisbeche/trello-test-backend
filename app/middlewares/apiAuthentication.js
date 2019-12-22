import jwt from 'express-jwt';
import UserManager from 'modules/userManager';

import { ApiUnauthorizedError, ApiForbiddenError } from 'modules/apiError';

class ApiAuthentication {
  static validJwt(req, res, next) {
    const jwtValidation = jwt({
      secret: global.env.key.jwtSecret,
      requestProperty: 'jwtToken',
      getToken: function fromHeaderOrQuerystring(req) {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
          return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.accessToken) {
          return req.query.accessToken;
        }
        return null;
      }
    });
    const handleErrorNext = err => {
      if (err) {
        if (
          err.name === 'UnauthorizedError' &&
          err.inner.name === 'TokenExpiredError'
        ) {
          return next(new ApiUnauthorizedError(err.message));
        }
      }
      next(err);
    };
    return jwtValidation(req, res, handleErrorNext);
  }

  static async retrieveUser(req, res, next) {
    let user = {};
    try {
      user = await UserManager.findById(req.jwtToken.userId);
    } catch (err) {
      return next(new ApiUnauthorizedError(err.message));
    }
    if (user == null) {
      return next(
        new ApiForbiddenError(
          "Jeton d'authentification de l'utilisateur introuvable"
        )
      );
    }
    req.user = user;
    next();
  }

  
}

export default ApiAuthentication;
