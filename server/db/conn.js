const Sequelize = require('sequelize');

const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/social-network-db',
  {
    logging: false,
  },
);

module.exports = conn;
