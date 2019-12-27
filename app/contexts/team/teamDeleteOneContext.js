

import { ApiServerError } from 'modules/apiError';


class TeamDeleteOneContext {
  static async call(team, query) {

    await team.remove(query, err => {
      if (err) {
        throw new ApiServerError(err.message);
      }
    });
  }
}

export default TeamDeleteOneContext;
