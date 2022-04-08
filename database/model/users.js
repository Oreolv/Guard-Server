const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const Users = sequelize.define(
  'users',
  {
    username: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    password: Sequelize.STRING(20),
    realName: Sequelize.STRING(8),
    roleName: Sequelize.STRING(20),
    roleValue: Sequelize.STRING(20),
    avatar: Sequelize.STRING(255),
    uphone: Sequelize.STRING(11),
    cname: Sequelize.STRING(20), // 所属社区
    rname: Sequelize.STRING(20), // 所属小区
    bname: Sequelize.STRING(20), // 所属楼栋
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// (async () => {
//   await users.sync({ alter: true });
// })();

module.exports = Users;
