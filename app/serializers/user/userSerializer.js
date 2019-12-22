

const userSerializer = user => {
  if (!user) {
    return {};
  }

  const data = {
    type: 'user',
    id: user.id,
    email: user.email,
    sessions: user.sessions
  };

  return data;
};

export default userSerializer;
