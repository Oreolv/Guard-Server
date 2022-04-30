const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Community = require('./community');
const Users = require('./users.js');

const Village = sequelize.define(
  'village',
  {
    name: Sequelize.STRING,
    grid_id: Sequelize.INTEGER,
    community_id: Sequelize.INTEGER,
    description: Sequelize.STRING,
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Village.belongsTo(Community, {
  foreignKey: 'community_id',
});

Community.hasMany(Village, {
  foreignKey: 'community_id',
});

Village.belongsTo(Users, {
  foreignKey: 'grid_id',
});

Users.hasMany(Village, {
  foreignKey: 'grid_id',
});

// (async () => {
//   await Village.sync({ alter: true });
// })();

module.exports = Village;
