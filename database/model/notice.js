const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');

const Notice = sequelize.define(
  'notice',
  {
    content: {
      type: Sequelize.TEXT('tiny'),
      comment: '公告内容',
    },
    grade: {
      type: Sequelize.INTEGER(1),
      comment: '重要等级，0低级1中级2紧急',
    },
    publisher: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: '发布人',
    },
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
  await Notice.sync({ force: true });
})();

module.exports = Notice;
