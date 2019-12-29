import CardSerializer from 'serializers/card/cardSerializer';
import CardCreateContext from 'contexts/card/cardCreateContext';
import CardSaveContext from 'contexts/card/cardSaveContext';
import CardDeleteOneContext from 'contexts/card/cardDeleteOneContext';
import CardManager from 'modules/cardManager';

import {
  ApiForbiddenError,
  ApiBadRequestError,
  ApiNotFoundError
} from 'modules/apiError';

class CardController {

  static async create(req, res, next) {
    let user;
    let givenParams;

    if (
      !req.body.listId ||
      !req.body.name
    ) {
      return next(
        new ApiBadRequestError(
          'Veuillez renseigner tous les champs afin de créer une liste'
        )
      );
    }

    givenParams = {
      content: req.body.content,
      idOwner: req.user.id,
      listId: req.body.listId,
      name: req.body.name
    };
    try {
      user = await CardCreateContext.call(givenParams);
    } catch (err) {
      return next(new ApiBadRequestError(err.message));
    }
    return res.json({
      data: CardSerializer(user)
    });
  }

  static async getListCard(req, res, next) {
    let cards;

    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }
    try {
      cards = await CardManager.findByList(req.params.idList);
    } catch (err) {
      return next(new ApiNotFoundError('cards not found'));
    }
    return res.json({
      data: cards.map(item => CardSerializer(item)),
      includes: []
    });
  }

  static async updateCard(req, res, next) {
    let card;

    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }

    try {
      card = await CardManager.findById(req.params.idCard)
    } catch (err) {
      return next(new ApiNotFoundError('Resource not found'));
    }
    if (req.body.content)
      card.content = req.body.content;
    if (req.body.name)
      card.name = req.body.name
    if (req.body.listId)
      card.listId = req.body.listId;

    try {
      await CardSaveContext.call(card);
    } catch (err) {
      return next(err);
    }

    return res.json({
      data: CardSerializer(card),
      includes: []
    });
  }

  static async delete(req, res, next) {
    let card;

    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }
    if (!(card = await CardManager.findById(req.params.idCard))) {
      return next(new ApiNotFoundError('Resource not found'));
    }


    try {
      await CardDeleteOneContext.call(card, { _id: card._id });
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [],
      includes: []
    });
  }

}

export default CardController;
