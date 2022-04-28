const Rlog = require('../database/model/rlog');
const Resident = require('../database/model/resident.js');
const { SuccessModel } = require('../model/response');

const getRlogList = async () => {
  const ret = await Rlog.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {
        as: 'userInfo',
        model: Resident,
        attributes: ['id', 'uname', 'avatar'],
      },
    ],
  });
  return new SuccessModel('获取成功', ret);
};

const writeRlog = async params => {
  const ret = await Rlog.create(params);
  return new SuccessModel('创建成功', ret);
};

module.exports = { getRlogList, writeRlog };
