import mongoose, { Schema } from 'mongoose';

const TeamSchema = mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    idOwner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    strict: true
  }
);


const Team = mongoose.model('Team', TeamSchema);

export default Team;
