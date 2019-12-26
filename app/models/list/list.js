import mongoose, { Schema }  from 'mongoose';

const ListSchema = mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    teamId: {
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


const List = mongoose.model('List', ListSchema);

export default List;
