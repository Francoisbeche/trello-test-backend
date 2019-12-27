import express from 'express';
import ApiAuthentication from 'middlewares/apiAuthentication';
import UserController from 'controllers/users/userController';
import ListController from 'controllers/lists/listController';
import TeamController from 'controllers/teams/teamController';
import SessionController from 'controllers/sessions/sessionController';
import CardController from 'controllers/cards/cardController';
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

    this.router
      .route('/list')
      .post(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        ListController.create
      )
    this.router
      .route('/list/:idList')
      .put(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        ListController.updateList
      ).delete(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        ListController.delete
      )

    this.router
      .route('/list/:teamId')
      .get(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        ListController.getUserList
      )

    this.router
      .route('/team')
      .post(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        TeamController.create
      ).get(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        TeamController.getUserTeam
      )

    this.router
      .route('/team/update/:idTeam')
      .put(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        TeamController.updateTeam
      )
    this.router
      .route('/team/delete/:idTeam')
      .delete(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        TeamController.delete
      )


    this.router
      .route('/card')
      .post(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        CardController.create
      )
    this.router
      .route('/card/update/:idCard')
      .put(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        CardController.updateCard
      )

    this.router
      .route('/card/delete/:idCard')
      .delete(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        CardController.delete
      )
    this.router
      .route('/card/:idList')
      .get(
        ApiAuthentication.validJwt,
        ApiAuthentication.retrieveUser,
        CardController.getListCard
      )
    this.router.route('/session').post(SessionController.create);
  }
}

export default Routes;
