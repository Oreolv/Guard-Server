const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const community = sequelize.define(
  'community',
  {
    id: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING(20),
    status: Sequelize.INTEGER(1),
    children: Sequelize.TEXT('long'),
    description: Sequelize.STRING(20),
    createTime: Sequelize.DATE(),
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await community.sync({ alter: true });
})();

module.exports = community;
