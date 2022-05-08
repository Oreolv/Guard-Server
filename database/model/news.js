const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const News = sequelize.define(
  'news',
  {
    newsId: {
      type: Sequelize.STRING,
      comment: '来源新闻ID',
      unique: true,
    },
    title: {
      type: Sequelize.STRING(80),
      comment: '新闻标题',
    },
    content: {
      type: Sequelize.TEXT('medium'),
      comment: '新闻内容，HTML格式',
    },
    cover: {
      type: Sequelize.STRING(180),
      comment: '新闻封面图',
    },
    mediaInfo: {
      type: Sequelize.STRING(250),
      comment: '新闻来源信息，包括头像、昵称、简介',
    },
    sourceURL: {
      type: Sequelize.STRING(180),
      comment: '新闻来源链接',
    },
    publishTime: {
      type: Sequelize.DATE,
      comment: '新闻发表时间',
    },
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

// (async () => {
//   await News.sync({ force: true });
// })();

module.exports = News;
