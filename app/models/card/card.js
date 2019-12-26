import mongoose, { Schema } from 'mongoose';

const CardSchema = mongoose.Schema(
  {
    listId: {
      type: String,
      required: true,
    },
    content: {
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


const Card = mongoose.model('Card', CardSchema);

export default Card;
