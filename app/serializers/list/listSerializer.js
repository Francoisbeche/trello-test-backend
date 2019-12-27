
const listSerializer = list => {
  if (!list) {
    return {};
  }

  const data = {
    type: 'list',
    id: list.id,
    listName: list.listName,
    teamId: list.id,
    cards: []
  };

  return data;
};

export default listSerializer;
