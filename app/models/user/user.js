import mongoose from 'mongoose';
import UserSessionSchema from 'models/user/userSessionSchema';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
      type: String
    },
    sessions: {
      type: [UserSessionSchema],
      default: []
    },
  },
  {
    strict: true
  }
);

/*  Hash Password before save  */
UserSchema.pre('save', async function(next) {
  var user = this;

  if (!user.isModified('password')) return next();
  try {
    user.password = await bcrypt.hashSync(user.password);
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
