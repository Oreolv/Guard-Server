const notice = require('../database/model/notice');
const { SuccessModel } = require('../model/response');

const getNoticeList = async () => {
  const ret = await notice.findAll();
  return new SuccessModel('获取成功', ret);
};

const createNotice = async params => {
  params.createTime = new Date();
  const n = await notice.create(params);
  return new SuccessModel('创建成功', n);
};

const removeNotice = async id => {
  const ret = await notice.destroy({
    where: {
      id: id,
    },
  });
  return new SuccessModel('删除成功', ret);
};

const updateNotice = async params => {
  const n = await notice.findOne({
    where: {
      id: params.id,
    },
  });
  n.set(params);
  await n.save();
  return new SuccessModel('修改成功', n);
};
module.exports = { getNoticeList, createNotice, removeNotice, updateNotice };
