const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Abnormal = sequelize.define(
  'abnormal',
  {
    status: Sequelize.INTEGER, // 审批状态
    applicant: Sequelize.INTEGER, // 申请人
    approver: Sequelize.INTEGER,
    approveTime: Sequelize.DATE,
    description: Sequelize.STRING,
    type: Sequelize.STRING,
    content: Sequelize.STRING,
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Abnormal.belongsTo(Users, {
  as: 'approverInfo',
  foreignKey: 'approver',
});
Abnormal.belongsTo(Resident, {
  as: 'applicantInfo',
  foreignKey: 'applicant',
});

Users.hasMany(Abnormal, {
  foreignKey: 'approver',
});
Resident.hasMany(Abnormal, {
  foreignKey: 'applicant',
});

// (async () => {
//   await Abnormal.sync({ alter: true });
// })();

module.exports = Abnormal;
