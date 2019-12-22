import express from 'express';
import ApiAuthentication from 'middlewares/apiAuthentication';
import UserController from 'controllers/users/userController';


class Routes {
  constructor() {
    this.router = express.Router();
    this._setRoutes();
  }

  getRouter() {
    return this.router;
  }

  _setRoutes() {
    this.router
      .route('/user')
      .post(UserController.create)
      .get(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        UserController.me
      );
  }
}

export default Routes;
