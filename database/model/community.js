const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');

const Community = sequelize.define(
  'community',
  {
    name: Sequelize.STRING(20),
    custodian: Sequelize.INTEGER,
    description: Sequelize.STRING(20),
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Community.belongsTo(Users, {
  as: 'custodianInfo',
  foreignKey: 'custodian',
});
Users.hasMany(Community, {
  foreignKey: 'custodian',
});

(async () => {
  await Community.sync({ alter: true });
})();

module.exports = Community;
