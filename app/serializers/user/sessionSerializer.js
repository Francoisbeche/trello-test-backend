
const sessionSerializer = ({ user, session } = {}) => {
  if (!session && !user) {
    return {};
  }
  if (!session ) {
    return {};
  }

  const data = {
    type: 'session',

    id: session.id,
    providerId: session.providerId,
    provider: session.provider,
    token: session.token,
    refreshToken: session.refreshToken,
    expireAt: session.expireAt
  };
  if (user) {
    data.user = user.id;
  }

  return data;
};

export default sessionSerializer;
