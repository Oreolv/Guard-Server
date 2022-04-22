const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Visitor = sequelize.define(
  'visitor',
  {
    status: Sequelize.INTEGER, // 审批状态
    applicant: Sequelize.INTEGER, // 申请人
    visitor: Sequelize.STRING, // 访客姓名
    foreign: Sequelize.INTEGER, // 访客是否为外地人
    come_from: Sequelize.STRING, // 访客来自哪里
    healthCode: Sequelize.STRING, // 健康码与行程码截图
    approver: Sequelize.INTEGER,
    approveTime: Sequelize.DATE,
    description: Sequelize.STRING,
    startTime: Sequelize.DATEONLY,
    endTime: Sequelize.DATEONLY,
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Visitor.belongsTo(Users, {
  as: 'approverInfo',
  foreignKey: 'approver',
});
Visitor.belongsTo(Resident, {
  as: 'applicantInfo',
  foreignKey: 'applicant',
});

Users.hasMany(Visitor, {
  foreignKey: 'approver',
});
Resident.hasMany(Visitor, {
  foreignKey: 'applicant',
});

// (async () => {
//   await Visitor.sync({ alter: true });
// })();

module.exports = Visitor;
