const conn = require('./conn');
const User = require('./User');

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [admin, gary] = await Promise.all([
    User.create({ username: 'admin', password: '123' }),
    User.create({ username: 'gary', password: '123' }),
  ]);

  return {
    users: {
      admin,
      gary,
    },
  };
};

module.exports = {
  syncAndSeed,
};
