const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const users = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    username: Sequelize.STRING(20),
    password: Sequelize.STRING(20),
    realName: Sequelize.STRING(8),
    roleName: Sequelize.STRING(20),
    roleValue: Sequelize.STRING(20),
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await users.sync();
})();

module.exports = users;
