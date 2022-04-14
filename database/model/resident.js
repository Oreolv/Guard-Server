const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const Resident = sequelize.define(
  'resident',
  {
    id: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    // 微信信息区
    openid: Sequelize.STRING(32),
    avatar: Sequelize.TEXT('long'), // 微信头像
    nickName: Sequelize.STRING(20), // 微信昵称
    // 个人信息区
    uname: Sequelize.STRING(10), // 姓名
    usex: Sequelize.INTEGER(1), // 性别
    uphone: Sequelize.STRING(11), // 手机号
    cname: Sequelize.STRING(20), // 社区名称
    vname: Sequelize.STRING(20), // 小区名称
    bnum: Sequelize.STRING(5), // 楼栋号
    hnum: Sequelize.STRING(5), // 单元号
    hname: Sequelize.STRING(5), // 房间号
    idCard: Sequelize.STRING(18), // 身份证号
    company: Sequelize.STRING(20), // 工作单位：具体到街道
    foreignStatus: Sequelize.INTEGER(1), // 是否当地居民 0否1是
    // 外地旅居信息
    trip: Sequelize.STRING(20), // 14天去往其他省市 无/市（以英文逗号分割）
    riskStatus: Sequelize.INTEGER(1), // 14天去往其他省市是否是中高风险地区 0否1是
    vehicle: Sequelize.INTEGER(1), // 乘坐交通工具 0驾车1大巴2火车3高铁4飞机
    vehicleNo: Sequelize.STRING(20), // 乘坐车牌号/车次/航班号
    vehicleSeat: Sequelize.STRING(20), // 乘坐座位号，自驾则填无
    // 隔离信息
    healthStatus: Sequelize.INTEGER(1), // 健康状态：0低风险 1中风险 2高风险
    isolationStatus: Sequelize.INTEGER(1), // 隔离状态：0否1是
    accessStatus: Sequelize.INTEGER(1), // 限制出入：0否1是
    isolationStart: Sequelize.DATE(), // 隔离开始时间
    isolationEnd: Sequelize.DATE(), // 隔离结束时间
    administrator: Sequelize.STRING(20), // 负责人 关联users.id, 显示 users.name
    // 填报信息
    recorder: Sequelize.STRING(20), // 关联users.id, 显示 users.name
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

// (async () => {
//   await Resident.sync({ alter: true });
// })();

module.exports = Resident;
