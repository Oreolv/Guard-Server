const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const authority = sequelize.define(
  'authority',
  {
    id: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    roleName: Sequelize.STRING(20),
    roleValue: Sequelize.STRING(20),
    description: Sequelize.STRING(20),
    createTime: Sequelize.DATE(),
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await authority.sync({ alter: true });
})();

module.exports = authority;
