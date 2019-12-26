
const cardSerializer = card => {
  if (!card) {
    return {};
  }

  const data = {
    type: 'card',
    id: card.id,
    content: card.content,
    teamId: card.idList
  };

  return data;
};

export default cardSerializer;
