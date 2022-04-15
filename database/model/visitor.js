const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const Visitor = sequelize.define(
  'visitor',
  {
    status: Sequelize.INTEGER, // 审批状态
    applicant: Sequelize.STRING, // 申请人
    visitor: Sequelize.STRING, // 访客姓名
    foreign: Sequelize.INTEGER, // 访客是否为外地人
    address: Sequelize.STRING, // 访客来自哪里
    healthCode: Sequelize.STRING, // 健康码与行程码截图
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

(async () => {
  await Visitor.sync({ alter: true });
})();

module.exports = Visitor;
