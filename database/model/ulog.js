const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');

const Ulog = sequelize.define(
  'ulog',
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: '用户ID',
    },
    method: {
      type: Sequelize.STRING(8),
      comment: '请求方法',
    },
    group: {
      type: Sequelize.STRING(15),
      comment: '请求对象',
    },
    members: {
      type: Sequelize.STRING(25),
      comment: '请求函数',
    },
    params: {
      type: Sequelize.TEXT('tiny'),
      comment: '请求参数',
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Ulog.belongsTo(Users, {
  as: 'userInfo',
  foreignKey: 'userId',
});

Users.hasMany(Ulog, {
  foreignKey: 'userId',
});

// (async () => {
//   await Ulog.sync({ alter: true });
// })();

module.exports = Ulog;
