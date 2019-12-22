
import validator from 'email-validator';
import UserManager from 'modules/UserManager';
import UserCreateUserContext from 'contexts/user/userCreateUserContext';
import UserSerializer from 'serializers/user/userSerializer';
import UserCreateSessionContext from 'contexts/sessions/userCreateSessionContext';

import {
  ApiForbiddenError,
  ApiBadRequestError
} from 'modules/apiError';

class UserController {


  static async create(req, res, next) {
    let user;
    let givenParams;

    if (
      !req.body.email ||
      !req.body.password
    ) {
      return next(
        new ApiBadRequestError(
          'Veuillez renseigner tous les champs afin de créer un compte'
        )
      );
    }
    if (validator.validate(req.body.email) == false) {
      return next(new ApiBadRequestError('Adresse courriel invalide'));
    }
    if ((user = await UserManager.findByEmail(req.body.email)) != null) {
      return next(new ApiForbiddenError('Adresse courriel déjà utilisée'));
    }
    if (req.body.password.length < 8 || req.body.password.length > 22) {
      return next(
        new ApiForbiddenError(
          'La taille du mot de passe doit être comprise entre 8 et 22 caractères'
        )
      );
    }
    givenParams = {
      email: req.body.email,
      password: req.body.password
    };
    try {
      user = await UserCreateUserContext.call(givenParams);
      await UserCreateSessionContext.createSession(
        user,
        'Dialogram'
      );
    } catch (err) {
      return next(new ApiBadRequestError(err.message));
    }
    return res.json({
      data: UserSerializer(user)
    });
  }
  
  static async me(req, res, next) {
    return res.json({
      data: [UserSerializer(req.user)],
      includes: []
    });
  }

}

export default UserController;
