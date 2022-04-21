const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Agency = sequelize.define(
  'agency',
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

Agency.belongsTo(Users, {
  as: 'approverInfo',
  foreignKey: 'approver',
});
Agency.belongsTo(Resident, {
  as: 'applicantInfo',
  foreignKey: 'applicant',
});

Users.hasMany(Agency, {
  foreignKey: 'approver',
});
Resident.hasMany(Agency, {
  foreignKey: 'applicant',
});

// (async () => {
//   await Agency.sync({ alter: true });
// })();

module.exports = Agency;
