const community = require('../database/model/community');
const users = require('../database/model/users');
const { SuccessModel, ErrorModel } = require('../model/response');

const getCustodianName = async id => {
  const { username } = await users.findOne({
    where: {
      id,
    },
  });
  return username;
};

const getCommunityList = async () => {
  const ret = await community.findAll();
  return new SuccessModel('获取成功', ret);
};

const createNewCommunity = async (name, custodian, description) => {
  await community.create({
    name,
    custodian: await getCustodianName(custodian),
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

const removeCommunity = async id => {
  const ret = await community.destroy({
    where: {
      id: id,
    },
  });
  if (ret) {
    return new SuccessModel('删除成功');
  } else {
    return new ErrorModel('社区不存在');
  }
};

const updateCommunity = async (id, name, custodian, description) => {
  const result = await community.update(
    { name, custodian: await getCustodianName(custodian), description },
    {
      where: {
        id: id,
      },
    }
  );
  await users.update(
    { cname: name },
    {
      where: {
        id: custodian,
      },
    }
  );
  // TODO: 更改用户时，清空旧用户的cname数据
  // TODO: 考虑一个用户是否能管理两个以上的社区
  return result[0] ? new SuccessModel('修改成功') : new ErrorModel('修改失败');
};

module.exports = {
  getCommunityList,
  createNewCommunity,
  removeCommunity,
  updateCommunity,
};
