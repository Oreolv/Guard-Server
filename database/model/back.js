const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');
const Resident = require('./resident');

const Back = sequelize.define(
  'back',
  {
    come_from: {
      type: Sequelize.STRING(),
      comment: '到达时间',
    },
    end_time: {
      type: Sequelize.DATE,
      comment: '到达时间',
    },
    health_code: {
      type: Sequelize.STRING(200),
      comment: '健康码与行程码截图',
    },
    risk_status: {
      type: Sequelize.INTEGER(1),
      comment: '始发地风险等级，0低1中2高风险',
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
