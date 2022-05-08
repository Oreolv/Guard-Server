const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Resident = require('./resident.js');

const Rlog = sequelize.define(
  'rlog',
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
      type: Sequelize.STRING(15),
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

Rlog.belongsTo(Resident, {
  as: 'userInfo',
  foreignKey: 'userId',
});

Resident.hasMany(Rlog, {
  foreignKey: 'userId',
});

(async () => {
  await Rlog.sync({ alter: true });
})();

module.exports = Rlog;
