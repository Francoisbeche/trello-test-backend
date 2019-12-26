import UserCreateSessionContext from 'contexts/sessions/userCreateSessionContext';
import SessionSerializer from 'serializers/user/sessionSerializer';

class SessionController {
  static async create(req, res, next) {
    let user;
    let session;
    try {
      session = await UserCreateSessionContext.call(req);
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [SessionSerializer({ user, session })],
      includes: []
    });
  }

}

export default SessionController;
