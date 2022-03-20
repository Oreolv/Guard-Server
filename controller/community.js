const community = require('../database/model/community');
const users = require('../database/model/users');
const { SuccessModel, ErrorModel } = require('../model/response');

const getCommunityList = async () => {
  const ret = await community.findAll();
  return new SuccessModel('获取成功', ret);
};

const createNewCommunity = async (name, custodian, description) => {
  const { username } = await users.findOne({
    where: {
      id: custodian,
    },
  });
  await community.create({
    name,
    custodian: username,
    description,
    createTime: new Date(),
  });
  await users.update(
    { cname: name },
    {
      where: {
        id: custodian,
      },
    }
  );
  // TODO 错误处理
  return new SuccessModel('创建成功');
};

module.exports = { getCommunityList, createNewCommunity };
