const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users.js');
const Community = sequelize.define(
  'community',
  {
    name: {
      type: Sequelize.STRING(15),
      comment: '社区名称',
    },
    description: {
      type: Sequelize.STRING(50),
      comment: '社区备注',
    },
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
    user_id: Sequelize.INTEGER,
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
  foreignKey: 'user_id',
  constraints: false,
});

// (async () => {
//   await Community.sync({ force: true });
//   await CommunityUser.sync({ force: true });
// })();

module.exports = Community;
