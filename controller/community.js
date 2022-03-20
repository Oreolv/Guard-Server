const community = require('../database/model/community');
const users = require('../database/model/users');
const { SuccessModel, ErrorModel } = require('../model/response');

const getCommunityList = async () => {
  const ret = await community.findAll();
  return new SuccessModel('获取成功', ret);
};
