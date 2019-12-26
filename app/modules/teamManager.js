import Team from 'models/team/team';

class TeamManager {
  static async findById(idTeam) {
    return await Team.findById(idTeam);
  }


  static async findByOwner(req) {
    return await Team.find({ idOwner: req });
  }

}

export default TeamManager;
