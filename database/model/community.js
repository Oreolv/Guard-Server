const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users.js');
const Community = sequelize.define(
  'community',
  {
    name: Sequelize.STRING(20),
    description: Sequelize.STRING(20),
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

const CommunityUser = sequelize.define(
  'community_user',
  {
    userId: Sequelize.INTEGER,
    community_id: Sequelize.INTEGER,
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

Community.belongsToMany(Users, {
  through: {
    model: CommunityUser,
    unique: false,
  },
  foreignKey: 'community_id',
  constraints: false,
});

Users.belongsToMany(Community, {
  through: {
    model: CommunityUser,
    unique: false,
  },
  foreignKey: 'userId',
  constraints: false,
});

// (async () => {
//   await Community.sync({ alter: true });
//   await CommunityUser.sync({ alter: true });
// })();

module.exports = Community;
