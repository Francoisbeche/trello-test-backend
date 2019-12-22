import mongoose from 'mongoose';


const UserSessionSchema = mongoose.Schema({
  providerId: {
    type: String
  },
  provider: {
    type: String,
    enum: ['Dialogram', 'Facebook', 'Google'],
    default: 'Dialogram'
  },
  token: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  expireAt: {
    type: Number,
    required: true
  },
  device: {
    userAgent: {
      type: String,
      default: null
    },
    OS: {
      type: String,
      default: null
    }
  }
});

export default UserSessionSchema;
