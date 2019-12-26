import { ApiBadRequestError } from 'modules/apiError';

class CardSaveContext {
  static async call(card) {
    try {
      await card.save();
    } catch (err) {
      throw new ApiBadRequestError(err.message);
    }
    return card;
  }
}

export default CardSaveContext;
