const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Role = require('./role.js');
const Users = sequelize.define(
  'users',
  {
    username: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    password: Sequelize.STRING(20),
    realName: Sequelize.STRING(8),
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    avatar: Sequelize.STRING(255),
    uphone: Sequelize.STRING(11),
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Users.belongsTo(Role, {
  as: 'roles',
  foreignKey: 'roleId',
});

Role.hasMany(Users, {
  foreignKey: 'roleId',
});

// 这里如果更新的话，会导致错误，暂时不更新
// (async () => {
//   await Users.sync({ alter: true });
// })();

module.exports = Users;
