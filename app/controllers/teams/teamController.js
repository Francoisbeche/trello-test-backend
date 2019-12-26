import TeamSerializer from 'serializers/team/teamSerializer';
import TeamCreateContext from 'contexts/team/TeamCreateContext';
import TeamManager from 'modules/TeamManager';

import {
  ApiForbiddenError,
  ApiBadRequestError,
  ApiNotFoundError
} from 'modules/apiError';

class TeamController {

  static async create(req, res, next) {
    let user;
    let givenParams;

    if (
      !req.body.teamName
    ) {
      return next(
        new ApiBadRequestError(
          'Veuillez renseigner tous les champs afin de créer une team'
        )
      );
    }
   
    givenParams = {
      teamName: req.body.teamName,
      idOwner: req.user.id
    };
    try {
      user = await TeamCreateContext.call(givenParams);
    } catch (err) {
      return next(new ApiBadRequestError(err.message));
    }
    return res.json({
      data: TeamSerializer(user)
    });
  }

  static async getUserTeam(req, res, next) {
    let teams;

    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }
    try {
      console.log(req.user._id)
      teams = await TeamManager.findByOwner(req.user._id);
    } catch (err) {
      return next(new ApiNotFoundError('Teams not found'));
    }
    return res.json({
      data: teams.map(item => TeamSerializer(item)),
      includes: []
    });
  }
  


}

export default TeamController;
