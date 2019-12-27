
const cardSerializer = card => {
  if (!card) {
    return {};
  }

  const data = {
    type: 'card',
    id: card.id,
    content: card.content,
    name: card.name,
    listId: card.listId
  };

  return data;
};

export default cardSerializer;
