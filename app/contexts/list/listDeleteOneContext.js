

import { ApiServerError } from 'modules/apiError';


class ListDeleteOneContext {
  static async call(list, query) {

    await list.remove(query, err => {
      if (err) {
        throw new ApiServerError(err.message);
      }
    });
  }
}

export default ListDeleteOneContext;
