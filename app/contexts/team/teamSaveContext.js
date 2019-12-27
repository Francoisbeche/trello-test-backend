import { ApiBadRequestError } from 'modules/apiError';

class TeamSaveContext {
  static async call(team) {
    try {
      await team.save();
    } catch (err) {
      throw new ApiBadRequestError(err.message);
    }
    return team;
  }
}

export default TeamSaveContext;
