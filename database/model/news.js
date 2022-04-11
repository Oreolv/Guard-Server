const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const News = sequelize.define(
  'news',
  {
    newsId: {
      type: Sequelize.STRING,
      unique: true,
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    cover: Sequelize.STRING,
    mediaInfo: Sequelize.TEXT,
    sourceURL: Sequelize.STRING,
    publishTime: Sequelize.DATE,
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

// (async () => {
//   await News.sync({ alter: true });
// })();

module.exports = News;
