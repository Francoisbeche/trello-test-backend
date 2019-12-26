
const teamSerializer = team => {
  if (!team) {
    return {};
  }

  const data = {
    type: 'team',
    id: team.id,
    teamName: team.teamName
  };

  return data;
};

export default teamSerializer;
