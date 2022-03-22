const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const resident = sequelize.define(
  'resident',
  {
    id: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    openid: Sequelize.STRING(32),
    uname: Sequelize.STRING(10),
    usex: Sequelize.INTEGER(1),
    uphone: Sequelize.INTEGER(11),
    cname: Sequelize.STRING(20), // 社区名称
    vname: Sequelize.STRING(20), // 小区名称
    bnum: Sequelize.STRING(5), // 楼栋号
    hnum: Sequelize.STRING(5), // 单元号
    hname: Sequelize.STRING(5), // 房间号
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await resident.sync({ alter: true });
})();

module.exports = resident;
