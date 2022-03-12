const Sequelize = require('sequelize');
const MYSQL_CONF = require('../config/db');
const sequelize = new Sequelize(
  MYSQL_CONF.database,
  MYSQL_CONF.user,
  MYSQL_CONF.password,
  {
    dialect: 'mysql',
    host: MYSQL_CONF.host,
    port: MYSQL_CONF.port,
    timezone: '+08:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
