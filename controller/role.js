const role = require('../database/model/role');
const { SuccessModel, ErrorModel } = require('../model/response');

const getRoleList = async roleValue => {
  if (roleValue !== 'super') {
    return new ErrorModel('无权查看');
  }
  const ret = await role.findAll();
  return new SuccessModel('获取成功', ret);
};

module.exports = { getRoleList };
