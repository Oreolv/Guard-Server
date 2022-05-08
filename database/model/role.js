const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const Role = sequelize.define(
  'role',
  {
    role_name: {
      type: Sequelize.STRING(10),
      comment: '角色名称',
    },
    role_value: {
      type: Sequelize.STRING(10),
      unique: true,
      comment: '角色值',
    },
    description: {
      type: Sequelize.STRING(50),
      comment: '角色备注',
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

// (async () => {
//   await Role.sync({ force: true });
// })();

module.exports = Role;
