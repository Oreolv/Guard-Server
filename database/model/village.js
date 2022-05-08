const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Community = require('./community');
const Users = require('./users.js');

const Village = sequelize.define(
  'village',
  {
    name: {
      type: Sequelize.STRING(15),
      comment: '小区名称',
    },
    description: {
      type: Sequelize.STRING(50),
      comment: '小区备注',
    },
    grid_id: {
      type: Sequelize.INTEGER,
      comment: '管理网格员ID',
    },
    community_id: {
      type: Sequelize.INTEGER,
      comment: '所属社区ID',
    },
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
  as: 'children',
  foreignKey: 'community_id',
});

Village.belongsTo(Users, {
  foreignKey: 'grid_id',
});

Users.hasMany(Village, {
  foreignKey: 'grid_id',
});

// (async () => {
//   await Village.sync({ force: true });
// })();

module.exports = Village;
