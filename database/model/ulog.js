const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');

const Ulog = sequelize.define(
  'ulog',
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    method: Sequelize.STRING,
    group: Sequelize.STRING,
    members: Sequelize.STRING,
    params: Sequelize.TEXT,
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
