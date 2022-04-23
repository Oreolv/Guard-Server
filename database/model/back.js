const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Back = sequelize.define(
  'back',
  {
    status: Sequelize.INTEGER, // 审批状态
    applicant: Sequelize.INTEGER, // 申请人
    approver: Sequelize.INTEGER,
    approveTime: Sequelize.DATE,
    description: Sequelize.STRING,
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
    healthCode: Sequelize.STRING, // 健康码与行程码截图
    come_from: Sequelize.STRING,
    vehicle: Sequelize.INTEGER(1), // 乘坐交通工具 0驾车1大巴2火车3高铁4飞机
    vehicleNo: Sequelize.STRING(20), // 乘坐车牌号/车次/航班号
    vehicleSeat: Sequelize.STRING(20), // 乘坐座位号，自驾则填无
    riskStatus: Sequelize.INTEGER(1), // 始发地风险等级
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Back.belongsTo(Users, {
  as: 'approverInfo',
  foreignKey: 'approver',
});
Back.belongsTo(Resident, {
  as: 'applicantInfo',
  foreignKey: 'applicant',
});

Users.hasMany(Back, {
  foreignKey: 'approver',
});
Resident.hasMany(Back, {
  foreignKey: 'applicant',
});

// (async () => {
//   await Back.sync({ alter: true });
// })();

module.exports = Back;
