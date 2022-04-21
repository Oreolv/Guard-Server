const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Material = sequelize.define(
  'material',
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
