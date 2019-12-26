import Card from 'models/card/card';
import { ApiBadRequestError } from 'modules/apiError';

class CardCreateContext {
  static async call(givenParams) {
    const card = new Card(givenParams);

    try {
      await card.save();
    } catch (err) {
      throw new ApiBadRequestError(err.message);
    }
    return card;
  }
}

export default CardCreateContext;
