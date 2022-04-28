const Ulog = require('../database/model/ulog');
const Users = require('../database/model/users');
const { SuccessModel } = require('../model/response');

const getUlogList = async () => {
  const ret = await Ulog.findAll({
    include: [
      {
        as: 'userInfo',
        model: Users,
        attributes: ['id', 'real_name', 'avatar'],
      },
    ],
  });
  return new SuccessModel('获取成功', ret);
};

const writeUlog = async params => {
  const ret = await Ulog.create(params);
  return new SuccessModel('创建成功', ret);
};

module.exports = { getUlogList, writeUlog };
