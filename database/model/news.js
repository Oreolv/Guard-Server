const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const News = sequelize.define(
  'news',
  {
    newsId: Sequelize.STRING,
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    cover: Sequelize.STRING,
    mediaInfo: Sequelize.STRING,
    sourceURL: Sequelize.STRING,
    publishTime: Sequelize.DATE,
  },
  {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  }
);

(async () => {
  await News.sync({ alter: true });
})();

module.exports = News;
