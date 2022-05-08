const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');
const Users = require('./users');

const Tips = sequelize.define(
  'tips',
  {
    tipsId: {
      type: Sequelize.STRING(15),
      comment: '知识来源ID',
      unique: true,
    },
    type: {
      type: Sequelize.STRING(10),
      comment: '知识分类',
    },
    title: {
      type: Sequelize.STRING(80),
      comment: '知识标题',
    },
    summary: {
      type: Sequelize.TEXT('tiny'),
      comment: '知识摘要',
    },
    content: {
      type: Sequelize.TEXT('medium'),
      comment: '知识内容，HTML格式',
    },
    source: {
      type: Sequelize.STRING(15),
      comment: '知识来源媒体名称',
    },
    sourceURL: {
      type: Sequelize.STRING(180),
      comment: '知识来源链接',
    },
    publisher: {
      type: Sequelize.INTEGER,
      allowNull: false,
      comment: '知识发布人',
    },
    publishTime: {
      type: Sequelize.DATE,
      comment: '知识发表时间',
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

Tips.belongsTo(Users, {
  as: 'publisherInfo',
  foreignKey: 'publisher',
});
Users.hasMany(Tips, {
  foreignKey: 'publisher',
});

// (async () => {
//   await Tips.sync({ force: true });
// })();

module.exports = Tips;
