const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');

const Notice = sequelize.define(
  'notice',
  {
    content: Sequelize.TEXT('long'),
    grade: Sequelize.INTEGER(1), // 重要等级，0低级1中级2紧急
    publisher: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, // 发布人
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

// 多对一，一个user可以发布多个notice
Notice.belongsTo(Users, {
  as: 'publisherInfo',
  foreignKey: 'publisher',
});
Users.hasMany(Notice, {
  foreignKey: 'publisher',
});

(async () => {
  await Notice.sync({ alter: true });
})();

module.exports = Notice;
