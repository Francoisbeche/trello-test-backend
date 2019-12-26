
const listSerializer = list => {
  if (!list) {
    return {};
  }

  const data = {
    type: 'list',
    id: list.id,
    listName: list.listName,
    teamId: list.id
  };

  return data;
};

export default listSerializer;
