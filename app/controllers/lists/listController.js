import ListSerializer from 'serializers/list/listSerializer';
import ListCreateContext from 'contexts/list/ListCreateContext';
import ListSaveContext from 'contexts/list/ListSaveContext';
import ListDeleteOneContext from 'contexts/list/ListDeleteOneContext';
import ListManager from 'modules/ListManager';
import {
  ApiForbiddenError,
  ApiBadRequestError,
  ApiNotFoundError
} from 'modules/apiError';

class ListController {

  static async create(req, res, next) {
    let user;
    let givenParams;

    if (
      !req.body.listName ||
      !req.body.teamId
    ) {
      return next(
        new ApiBadRequestError(
          'Veuillez renseigner tous les champs afin de créer une liste'
        )
      );
    }

    givenParams = {
      listName: req.body.listName,
      teamId: req.body.teamId,
      idOwner: req.user.id
    };
    try {
      user = await ListCreateContext.call(givenParams);
    } catch (err) {
      return next(new ApiBadRequestError(err.message));
    }
    return res.json({
      data: ListSerializer(user)
    });
  }

  static async getUserList(req, res, next) {
    let lists;

    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }
    try {
      lists = await ListManager.findByTeam(req.params.teamId);
    } catch (err) {
      return next(new ApiNotFoundError('lists not found'));
    }
    return res.json({
      data: lists.map(item => ListSerializer(item)),
      includes: []
    });
  }

  static async updateList(req, res, next) {
    let list;

    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }
    if (
      !req.body.listName
    ) {
      return next(new ApiBadRequestError('Fields missing'));
    }
    try {
      list = await ListManager.findById(req.params.idList)
    } catch (err) {
      return next(new ApiNotFoundError('Resource not found'));
    }
 
    list.listName = req.body.listName;

    try {
      await ListSaveContext.call(list);
    } catch (err) {
      return next(err);
    }

    return res.json({
      data: [ListSerializer(list)],
      includes: []
    });
  }

  static async delete(req, res, next) {
    let list;

    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }
    if (!(list = await ListManager.findById(req.params.idList))) {
      return next(new ApiNotFoundError('Resource not found'));
    }

 
    try {
      await ListDeleteOneContext.call(list, { _id: list._id });
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [],
      includes: []
    });
  }

}

export default ListController;
