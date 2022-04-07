const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const notice = sequelize.define(
  'notice',
  {
    id: {
      type: Sequelize.INTEGER(20),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    content: Sequelize.TEXT('long'),
    grade: Sequelize.INTEGER(1), // 重要等级，0低级1中级2紧急
    publisher: Sequelize.STRING(20), // 发布人
    createTime: Sequelize.DATE(),
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await notice.sync({ alter: true });
})();

module.exports = notice;
