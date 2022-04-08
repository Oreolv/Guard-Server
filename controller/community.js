const sequelize = require('../database/sequelize');
const { QueryTypes } = require('sequelize');
const community = require('../database/model/community');
const users = require('../database/model/users');
const { SuccessModel, ErrorModel } = require('../model/response');

const getCommunityList = async (name = '', realName = '') => {
  const sql = `SELECT id, name, custodian, description, createTime FROM community WHERE (name like '%${name}%' OR '' = '${name}') AND ('' = '${realName}' OR custodian = '${realName}')`;
  const ret = await sequelize.query(sql, { type: QueryTypes.SELECT });
  return new SuccessModel('获取成功', ret);
};

const createCommunity = async params => {
  params.createTime = new Date();
  await users.update(
    { cname: params.name },
    {
      where: {
        id: params.custodian,
      },
    }
  );
  params.custodian = params.realName;
  await community.create(params);
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

const updateCommunity = async params => {
  await community.update(
    {
      name: params.name,
      custodian: params.realName,
      description: params.description,
    },
    {
      where: {
        id: params.id,
      },
    }
  );
  await users.update(
    { cname: params.name },
    {
      where: {
        id: params.custodian,
      },
    }
  );
  // TODO: 更改用户时，清空旧用户的cname数据
  // TODO: 考虑一个用户是否能管理两个以上的社区
  return new SuccessModel('修改成功');
};

module.exports = {
  getCommunityList,
  createCommunity,
  removeCommunity,
  updateCommunity,
};
