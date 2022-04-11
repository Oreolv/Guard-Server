const Tips = require('../database/model/tips');
const { SuccessModel } = require('../model/response');
const Users = require('../database/model/users');

const getTipsList = async params => {
  const ret = await Tips.findAll({
    limit: params.pageSize,
    offset: params.pageSize * (params.page - 1),
    include: [
      {
        model: Users,
        as: 'publisherInfo',
        attributes: ['username', 'realName', 'avatar'],
      },
    ],
  });
  return new SuccessModel('获取成功', ret);
};

const createTips = async params => {
  const n = await Tips.create(params);
  return new SuccessModel('创建成功', n);
};

const removeTips = async id => {
  const ret = await Tips.destroy({
    where: {
      id: id,
    },
  });
  return new SuccessModel('删除成功', ret);
};

const updateTips = async params => {
  const n = await Tips.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('修改成功', n);
};
module.exports = { getTipsList, createTips, removeTips, updateTips };
