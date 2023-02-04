const Sequelize = require('sequelize');

const config = {};

if (process.env.QUIET) {
  config.logging = false;
}

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/fb-clone', config);

module.exports = conn;
