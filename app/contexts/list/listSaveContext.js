import { ApiBadRequestError } from 'modules/apiError';

class ListSaveContext {
  static async call(list) {
    try {
      await list.save();
    } catch (err) {
      throw new ApiBadRequestError(err.message);
    }
    return list;
  }
}

export default ListSaveContext;
