const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Visitor = sequelize.define(
  'visitor',
  {
    visitor: {
      type: Sequelize.STRING(15),
      comment: '访客姓名',
    },
    foreign: {
      type: Sequelize.INTEGER(1),
      comment: '访客是否为外地人,0否1是',
    },
    come_from: {
      type: Sequelize.STRING(30),
      comment: '访客来自哪里',
    },
    health_code: {
      type: Sequelize.STRING(200),
      comment: '健康码与行程码截图',
    },
    start_time: {
      type: Sequelize.DATEONLY,
      comment: '访问开始时间',
    },
    end_time: {
      type: Sequelize.DATEONLY,
      comment: '访问结束时间',
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
//   await Visitor.sync({ force: true });
// })();

module.exports = Visitor;
