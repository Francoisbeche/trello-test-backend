import List from 'models/list/list';
import { ApiBadRequestError } from 'modules/apiError';

class ListCreateContext {
  static async call(givenParams) {
    const list = new List(givenParams);

    try {
      await list.save();
    } catch (err) {
      throw new ApiBadRequestError(err.message);
    }
    return list;
  }
}

export default ListCreateContext;
