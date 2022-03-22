const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const role = sequelize.define(
  'role',
  {
    id: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    roleName: Sequelize.STRING(20),
    roleValue: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    description: Sequelize.STRING(20),
    createTime: Sequelize.DATE(),
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// (async () => {
//   await role.sync({ alter: true });
// })();

module.exports = role;
