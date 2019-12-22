import jwt from 'jsonwebtoken';
import UserManager from 'modules/userManager';
import bcrypt from 'bcrypt-nodejs';

import {
  ApiBadRequestError,
  ApiUnauthorizedError,
  ApiNotFoundError
} from 'modules/apiError';

class UserCreateSessionContext {

  static async call(req) {
    let givenParams = req.body;
    let user;

    if (!givenParams.email || !givenParams.password) {
      throw new ApiBadRequestError(
        "L'adresse courriel ainsi que le mot de passe doivent être renseignés"
      );
    }
    try {
      user = await UserManager.findByEmail(req.body.email);
    } catch (err) {
      throw new ApiUnauthorizedError(
        'Pseudonyme et/ou mot de passe invalide(s)'
      );
    }
    if (
      user == null ||
      !bcrypt.compareSync(givenParams.password, user.password)
    ) {
      throw new ApiUnauthorizedError(
        'Pseudonyme et/ou mot de passe invalide(s)'
      );
    }
    return this.createSession(
      user,
      'Dialogram'
    );
  }

  static async createSession(user, provider) {
    const token = jwt.sign({ userId: user._id }, global.env.key.jwtSecret, {
      algorithm: 'HS256',
      expiresIn: 86000
    });
    const refreshToken = jwt.sign(
      { userId: user._id, accessToken: token },
      global.env.key.jwtSecret,
      {
        algorithm: 'HS256',
        expiresIn: 86000
      }
    );
    let session = {
      token,
      refreshToken: refreshToken,
      expireAt: Date.now() + 86000,
      provider: provider,
      device: {
        userAgent: null,
        OS: null
      }

    };
    console.log("sessions", session)
    if (user.sessions instanceof Array) {
      user.sessions.push(session);
    } else {
      user.sessions = [session];
    }

    try {
      await user.save();
    } catch (err) {
      throw new ApiBadRequestError(err.message);
    }
    return user;
  }
}

export default UserCreateSessionContext;
