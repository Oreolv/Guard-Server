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
    comeFrom: Sequelize.STRING, // 访客来自哪里
    getTo: Sequelize.STRING, // 访客去往哪里
    healthCode: Sequelize.STRING, // 健康码与行程码截图
    approver: Sequelize.INTEGER,
    approveTime: Sequelize.STRING,
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
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
