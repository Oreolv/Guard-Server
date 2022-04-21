const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Health = sequelize.define(
  'health',
  {
    status: Sequelize.INTEGER, // 审批状态
    applicant: Sequelize.INTEGER, // 申请人
    approver: Sequelize.INTEGER,
    approveTime: Sequelize.DATE,
    description: Sequelize.STRING,
    temperature: Sequelize.STRING,
    diagnosis: Sequelize.INTEGER, // 是否为疑似、确诊患者
    contact: Sequelize.INTEGER, // 是否接触疑似、确诊患者
    symptom: Sequelize.INTEGER, // 是否有咳嗽、乏力等症状
    hospital: Sequelize.STRING, // 就诊、住院、或无
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Health.belongsTo(Users, {
  as: 'approverInfo',
  foreignKey: 'approver',
});
Health.belongsTo(Resident, {
  as: 'applicantInfo',
  foreignKey: 'applicant',
});

Users.hasMany(Health, {
  foreignKey: 'approver',
});
Resident.hasMany(Health, {
  foreignKey: 'applicant',
});

// (async () => {
//   await Health.sync({ alter: true });
// })();

module.exports = Health;
