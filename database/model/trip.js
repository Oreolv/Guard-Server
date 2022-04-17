const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Resident = require('./resident');
const Users = require('./users');

const Trip = sequelize.define(
  'trip',
  {
    applicant: Sequelize.INTEGER,
    approver: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    destination: Sequelize.STRING, // 目的地
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
    approveTime: Sequelize.DATE,
    vehicle: Sequelize.INTEGER(1), // 乘坐交通工具 0驾车1大巴2火车3高铁4飞机
    vehicleNo: Sequelize.STRING(20), // 乘坐车牌号/车次/航班号
    vehicleSeat: Sequelize.STRING(20), // 乘坐座位号，自驾则填无
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Trip.belongsTo(Resident, {
  as: 'applicantInfo',
  foreignKey: 'applicant',
});
Trip.belongsTo(Users, {
  as: 'approverInfo',
  foreignKey: 'approver',
});

Resident.hasMany(Trip, {
  foreignKey: 'applicant',
});
Users.hasMany(Trip, {
  foreignKey: 'approver',
});

// (async () => {
//   await Trip.sync({ alter: true });
// })();

module.exports = Trip;
