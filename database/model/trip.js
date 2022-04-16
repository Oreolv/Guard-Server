const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Resident = require('./resident');

const Trip = sequelize.define(
  'trip',
  {
    residentId: Sequelize.INTEGER,
    destination: Sequelize.STRING, // 目的地
    startTime: Sequelize.DATE,
    endTime: Sequelize.DATE,
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
  as: 'residentInfo',
  foreignKey: 'residentId',
});

Resident.hasMany(Trip, {
  foreignKey: 'residentId',
});

(async () => {
  await Trip.sync({ alter: true });
})();

module.exports = Trip;
