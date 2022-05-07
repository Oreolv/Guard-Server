const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');

const Resident = sequelize.define(
  'resident',
  {
    // 微信信息区
    openid: {
      type: Sequelize.STRING(32),
      comment: '居民微信openid，作为登陆唯一凭证',
    },
    avatar: {
      type: Sequelize.STRING(180),
      comment: '居民微信头像或自定义头像',
    },
    nickName: {
      type: Sequelize.STRING(8),
      comment: '居民微信昵称或自定义昵称',
    },
    // 个人信息区
    uname: {
      type: Sequelize.STRING(15),
      comment: '居民真实姓名',
    },
    usex: {
      type: Sequelize.INTEGER(1),
      comment: '居民性别，0男1女',
    },
    uphone: {
      type: Sequelize.STRING(11),
      comment: '居民手机号',
    },
    cname: {
      type: Sequelize.STRING(10),
      comment: '居民居住社区名',
    },
    vname: {
      type: Sequelize.STRING(10),
      comment: '居民居住小区名',
    },
    bnum: {
      type: Sequelize.STRING(5),
      comment: '居民家庭住址楼栋号',
    },
    hnum: {
      type: Sequelize.STRING(5),
      comment: '居民家庭住址单元号',
    },
    hname: {
      type: Sequelize.STRING(5),
      comment: '居民家庭住址房间号',
    },
    id_card: {
      type: Sequelize.STRING(18),
      comment: '居民身份证号',
    },
    company: {
      type: Sequelize.STRING(25),
      comment: '居民工作单位，具体到街道',
    },
    foreign_status: {
      type: Sequelize.INTEGER(1),
      comment: '是否当地居民 0否1是',
    },
    // 外地旅居信息
    trip: {
      type: Sequelize.STRING(20),
      comment: '14天去往其他省市 无/市（以英文逗号分割）',
    },
    risk_status: {
      type: Sequelize.INTEGER(1),
      comment: '14天去往其他省市是否是中高风险地区 0否1是',
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
    // 隔离信息
    health_status: {
      type: Sequelize.INTEGER(1),
      comment: '健康状态，0低风险1中风险2高风险',
    },
    isolation_status: {
      type: Sequelize.INTEGER(1),
      comment: '隔离状态，0否1是',
    },
    access_status: {
      type: Sequelize.INTEGER(1),
      comment: '限制出入，0否1是',
    },
    isolation_start: {
      type: Sequelize.DATE(),
      comment: '隔离开始时间',
    },
    isolation_end: {
      type: Sequelize.DATE(),
      comment: '隔离结束时间',
    },
    administrator: {
      type: Sequelize.INTEGER,
      comment: '隔离负责人',
    },
    // 填报信息
    recorder: {
      type: Sequelize.INTEGER,
      comment: '信息填报人',
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Resident.belongsTo(Users, {
  as: 'administratorInfo',
  foreignKey: 'administrator',
});
Users.hasMany(Resident, {
  foreignKey: 'administrator',
});

Resident.belongsTo(Users, {
  as: 'recorderInfo',
  foreignKey: 'recorder',
});
Users.hasMany(Resident, {
  foreignKey: 'recorder',
});

// (async () => {
//   await Resident.sync({ alter: true });
// })();

module.exports = Resident;
