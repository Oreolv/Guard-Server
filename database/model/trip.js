const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Resident = require('./resident');
const Users = require('./users');

const Trip = sequelize.define(
  'trip',
  {
    destination: {
      type: Sequelize.STRING(10),
      comment: '行程目的地',
    },
    start_time: {
      type: Sequelize.DATEONLY,
      comment: '出发时间',
    },
    end_time: {
      type: Sequelize.DATEONLY,
      comment: '到达时间',
    },
    vehicle: {
      type: Sequelize.INTEGER(1),
      comment: '乘坐交通工具 0驾车1大巴2火车3高铁4飞机',
    },
    vehicle_no: {
      type: Sequelize.STRING(10),
      comment: '乘坐车牌号/车次/航班号',
    },
    vehicle_seat: {
      type: Sequelize.STRING(10),
      comment: '乘坐座位号，自驾则填无',
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
