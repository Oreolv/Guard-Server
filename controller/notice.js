const Notice = require('../database/model/Notice');
const { SuccessModel } = require('../model/response');
const Users = require('../database/model/users');

const getNoticeList = async params => {
  const ret = await Notice.findAndCountAll({
    order: [['createdAt', 'DESC']],
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

const createNotice = async params => {
  const n = await Notice.create(params);
  return new SuccessModel('创建成功', n);
};

const removeNotice = async id => {
  const ret = await Notice.destroy({
    where: {
      id: id,
    },
  });
  return new SuccessModel('删除成功', ret);
};

const updateNotice = async params => {
  const n = await Notice.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('修改成功', n);
};
module.exports = { getNoticeList, createNotice, removeNotice, updateNotice };
