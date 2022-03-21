const sequelize = require('../database/sequelize');
const { QueryTypes } = require('sequelize');
const community = require('../database/model/community');
const users = require('../database/model/users');
const { SuccessModel, ErrorModel } = require('../model/response');

const getCommunityList = async (name = '', username = '') => {
  const sql = `SELECT id, name, custodian, description, createTime FROM community WHERE (name like '%${name}%' OR '' = '${name}') AND ('' = '${username}' OR custodian = '${username}')`;
  const ret = await sequelize.query(sql, { type: QueryTypes.SELECT });
  return new SuccessModel('获取成功', ret);
};

const createNewCommunity = async (name, custodian, username, description) => {
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

const updateCommunity = async (id, name, custodian, username, description) => {
  const result = await community.update(
    { name, custodian: username, description },
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
  return new SuccessModel('修改成功');
};

module.exports = {
  getCommunityList,
  createNewCommunity,
  removeCommunity,
  updateCommunity,
};
