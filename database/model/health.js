const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Health = sequelize.define(
  'health',
  {
    temperature: {
      type: Sequelize.STRING(15),
      comment: '今日体温',
    },
    diagnosis: {
      type: Sequelize.INTEGER(1),
      comment: '是否为疑似、确诊患者，0否1是',
    },
    contact: {
      type: Sequelize.INTEGER(1),
      comment: '是否接触疑似、确诊患者，0否1是',
    },
    symptom: {
      type: Sequelize.INTEGER(1),
      comment: '是否有咳嗽、乏力等症状，0否1是',
    },
    hospital: {
      type: Sequelize.INTEGER(1),
      comment: '是否就诊或住院，无0、就诊1、住院2',
    }, // 就诊、住院、或无
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
//   await Health.sync({ force: true });
// })();

module.exports = Health;
