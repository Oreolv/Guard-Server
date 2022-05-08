const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Material = sequelize.define(
  'material',
  {
    type: {
      type: Sequelize.STRING(10),
      comment: '物资申请类型',
    },
    content: {
      type: Sequelize.STRING(200),
      comment: '物资申请详细说明',
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

Material.belongsTo(Users, {
  as: 'approverInfo',
  foreignKey: 'approver',
});
Material.belongsTo(Resident, {
  as: 'applicantInfo',
  foreignKey: 'applicant',
});

Users.hasMany(Material, {
  foreignKey: 'approver',
});
Resident.hasMany(Material, {
  foreignKey: 'applicant',
});

// (async () => {
//   await Material.sync({ alter: true });
// })();

module.exports = Material;
