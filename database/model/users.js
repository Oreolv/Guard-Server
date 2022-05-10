const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Role = require('./role.js');
const Users = sequelize.define(
  'users',
  {
    username: {
      type: Sequelize.STRING(10),
      unique: true,
      comment: '用户名',
    },
    password: {
      type: Sequelize.STRING(60),
      unique: true,
      comment: '用户密码',
    },
    salt: {
      type: Sequelize.STRING(36),
      unique: true,
      comment: '用户Salt',
    },
    real_name: {
      type: Sequelize.STRING(15),
      unique: true,
      comment: '用户真实姓名',
    },
    role_id: {
      type: Sequelize.INTEGER,
      comment: '用户角色ID',
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING(180),
      comment: '用户头像',
    },
    uphone: {
      type: Sequelize.STRING(11),
      comment: '用户手机号',
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Users.belongsTo(Role, {
  as: 'roles',
  foreignKey: 'role_id',
});

Role.hasMany(Users, {
  foreignKey: 'role_id',
});

// (async () => {
//   await Users.sync({ alter: true });
// })();

module.exports = Users;
