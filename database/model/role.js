const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const role = sequelize.define(
  'role',
  {
    roleName: Sequelize.STRING(20),
    roleValue: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    description: Sequelize.STRING(20),
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

(async () => {
  await role.sync({ alter: true });
})();

module.exports = role;
