

import { ApiServerError } from 'modules/apiError';


class CardDeleteOneContext {
  static async call(card, query) {

    await card.remove(query, err => {
      if (err) {
        throw new ApiServerError(err.message);
      }
    });
  }
}

export default CardDeleteOneContext;
