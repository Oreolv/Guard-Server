const News = require('../database/model/news');
const { Op } = require('sequelize');
const { SuccessModel } = require('../model/response');

const getNewsList = async params => {
  const currentDate = new Date();
  const threeDaysAgo = new Date(Number(currentDate) - 86400000 * 3);
  const whereObj = {
    publishTime: { [Op.between]: [threeDaysAgo, currentDate] },
  };
  if (params.keyword) {
    whereObj.title = { [Op.like]: `%${params.keyword}%` };
  }
  const ret = await News.findAndCountAll({
    order: [['publishTime', 'DESC']],
    limit: params.pageSize,
    offset: params.pageSize * (params.page - 1),
    where: whereObj,
    row: true,
  });
  ret.rows.forEach(i => {
    i.mediaInfo = JSON.parse(i.mediaInfo);
  });

  return new SuccessModel('获取成功', ret);
};

const createNews = async params => {
  const n = await News.create(params);
  return new SuccessModel('创建成功', n);
};

const removeNews = async id => {
  const ret = await News.destroy({
    where: {
      id: id,
    },
  });
  return new SuccessModel('删除成功', ret);
};

const updateNews = async params => {
  const n = await News.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('修改成功', n);
};
module.exports = { getNewsList, createNews, removeNews, updateNews };
