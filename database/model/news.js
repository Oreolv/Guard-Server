const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const News = sequelize.define(
  'news',
  {
    publishTime: Sequelize.DATE, // 新闻发布时间
    title: Sequelize.STRING,
    summary: Sequelize.STRING,
    content: Sequelize.TEXT,
    infoSource: Sequelize.STRING,
    sourceURL: Sequelize.STRING,
    province: Sequelize.STRING,
    provinceId: Sequelize.INTEGER,
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
