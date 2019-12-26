import Card from 'models/card/card';

class CardManager {
  static async findById(idCard) {
    return await Card.findById(idCard);
  }


  static async findByList(req) {
    return await Card.find({ listId: req });
  }

}

export default CardManager;
