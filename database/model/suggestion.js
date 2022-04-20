const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Suggestion = sequelize.define(
  'suggestion',
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

Suggestion.belongsTo(Users, {
  as: 'approverInfo',
  foreignKey: 'approver',
});
Suggestion.belongsTo(Resident, {
  as: 'applicantInfo',
  foreignKey: 'applicant',
});

Users.hasMany(Suggestion, {
  foreignKey: 'approver',
});
Resident.hasMany(Suggestion, {
  foreignKey: 'applicant',
});

// (async () => {
//   await Suggestion.sync({ alter: true });
// })();

module.exports = Suggestion;
