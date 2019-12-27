import TeamSerializer from 'serializers/team/teamSerializer';
import TeamCreateContext from 'contexts/team/TeamCreateContext';
import TeamDeleteOneContext from 'contexts/team/TeamDeleteOneContext';

import TeamManager from 'modules/TeamManager';
import TeamSaveContext from 'contexts/team/TeamSaveContext';
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
      teams = await TeamManager.findByOwner(req.user._id);
    } catch (err) {
      return next(new ApiNotFoundError('Teams not found'));
    }
    return res.json({
      data: teams.map(item => TeamSerializer(item)),
      includes: []
    });
  }

  static async updateTeam(req, res, next) {
    let team
    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }
    if (
      !req.body.teamName
    ) {
      return next(
        new ApiBadRequestError(
          'Veuillez renseigner pour modifier une team'
        )
      );
    }

    try {
      team = await TeamManager.findById(req.params.idTeam)
    } catch (err) {
      return next(new ApiNotFoundError('Resource not found'));
    }
    team.teamName = req.body.teamName;


    try {
      await TeamSaveContext.call(team);
    } catch (err) {
      return next(err);
    }

    return res.json({
      data: TeamSerializer(team),
      includes: []
    });
  }


  static async delete(req, res, next) {
    let team;

    if (!req.user) {
      return next(new ApiForbiddenError('User not found'));
    }
    if (!(team = await TeamManager.findById(req.params.idTeam))) {
      return next(new ApiNotFoundError('Resource not found'));
    }


    try {
      await TeamDeleteOneContext.call(team, { _id: team._id });
    } catch (err) {
      return next(err);
    }
    return res.json({
      data: [],
      includes: []
    });
  }

}

export default TeamController;
