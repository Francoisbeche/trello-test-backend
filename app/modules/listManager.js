import List from 'models/list/list';

class ListManager {
  static async findById(idList) {
    return await List.findById(idList);
  }


  static async findByTeam(req) {
    return await List.find({ teamId: req });
  }

}

export default ListManager;
