const createTokenUser = (user) => {
  return {
    name: user.name,
    userId: user._id,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
};

module.exports = createTokenUser;
