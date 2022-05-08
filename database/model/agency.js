const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Agency = sequelize.define(
  'agency',
  {
    type: {
      type: Sequelize.STRING(10),
      comment: '代办事件类型',
    },
    content: {
      type: Sequelize.STRING(200),
      comment: '代办事件详细说明',
    },
    status: {
      type: Sequelize.INTEGER(1),
      comment: '审批状态',
    },
    applicant: {
      type: Sequelize.INTEGER,
      comment: '申请人',
    },
    approver: {
      type: Sequelize.INTEGER,
      comment: '审批人',
    },
    approve_time: {
      type: Sequelize.DATE,
      comment: '审批时间',
    },
    description: {
      type: Sequelize.STRING(50),
      comment: '审批意见',
    },
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
