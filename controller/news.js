const News = require('../database/model/News');
const { SuccessModel } = require('../model/response');

const getNewsList = async () => {
  const ret = await News.findAll();
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
