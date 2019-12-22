import User from 'models/user/user';
import { ApiBadRequestError } from 'modules/apiError';

class UserCreateUserContext {
  static async call(givenParams) {
    const user = new User(givenParams);

    try {
      await user.save();
    } catch (err) {
      throw new ApiBadRequestError(err.message);
    }
    return user;
  }
}

export default UserCreateUserContext;
