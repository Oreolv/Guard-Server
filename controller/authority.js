const authority = require('../database/model/authority');
const { SuccessModel, ErrorModel } = require('../model/response');

const getAuthInfo = async roleValue => {
  if (roleValue !== 'super') {
    return new ErrorModel('无权查看');
  }
  const ret = await authority.findAll();
  return new SuccessModel('获取成功', ret);
};

module.exports = { getAuthInfo };
