import User from 'models/user/user';

class UserManager {
  static async findByRefreshToken(refresh) {
    return await User.findOne({
      sessions: { $elemMatch: { refreshToken: { $eq: refresh } } }
    });
  }
  static async findById(userId) {
    return await User.findById(userId);
  }

  static async findByProvider(provider, userId) {
    return await User.findOne({
      'profile.createdWith.provider': provider,
      'profile.createdWith.userId': userId
    });
  }

  static async findByEmail(req) {
    return await User.findOne({ email: req });
  }

  static async findByNickName(req) {
    return await User.findOne({ nickName: req });
  }

  static async findByToken(req) {
    return await User.findOne({ 'sessions.token': req.params.token });
  }

  static async findByTokenForgotPassword(req) {
    return await User.findOne({ 'tokenReset.tokenPassword': req.params.token });
  }

  static async findByTokenUpdateEmail(req) {
    return await User.findOne({
      'tokenReset.resetEmail.tokenEmail': req.params.token
    });
  }

  static async findByTokenConfirmAccount(req) {
    return await User.findOne({
      'settings.confirmedAccount.token': req.params.token
    });
  }

  static async searchByNickName(req) {
    return await User.search(req);
  }
}

export default UserManager;
