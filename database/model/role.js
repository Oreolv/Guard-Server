const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const Role = sequelize.define(
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
  await Role.sync({ alter: true });
})();

module.exports = Role;
