import Team from 'models/team/team';
import { ApiBadRequestError } from 'modules/apiError';

class TeamCreateContext {
  static async call(givenParams) {
    const team = new Team(givenParams);

    try {
      await team.save();
    } catch (err) {
      throw new ApiBadRequestError(err.message);
    }
    return team;
  }
}

export default TeamCreateContext;
