const { Op } = require('sequelize');
const Users = require('../database/model/users');
const Community = require('../database/model/Community');
const { SuccessModel } = require('../model/response');

const getCommunityList = async (name = '', custodian = '') => {
  const nameWhereObject = name ? { name: { [Op.like]: `%${name}%` } } : null;
  // const custodianWhereObject = custodian ? { id: custodian } : null;
  // TODO: 在include里面使用where会导致users里面只出现查找的那个user
  const ret = await Community.findAll({
    include: [
      {
        model: Users,
        attributes: ['id', 'username', 'realName'],
        through: { attributes: [] },
        // where: custodianWhereObject,
      },
    ],
    where: nameWhereObject,
  });
  if (custodian) {
    return new SuccessModel(
      '获取成功',
      ret.filter(i => JSON.stringify(i.users).includes(`"id":${custodian}`))
    );
  }
  return new SuccessModel('获取成功', ret);
};

const createCommunity = async params => {
  const community = await Community.create(params);
  const user = await Users.findAll({ where: { id: params.custodians } });
  await community.setUsers(user);
  return new SuccessModel('创建成功');
};

const removeCommunity = async id => {
  const community = await Community.findByPk(id);
  community.destroy();
  community.setUsers([]);
  return new SuccessModel('删除成功');
};

const updateCommunity = async params => {
  const user = await Users.findAll({ where: { id: params.custodians } });
  const community = await Community.findByPk(params.id);
  community.update(params);
  community.setUsers(user);
  return new SuccessModel('修改成功');
};

module.exports = {
  getCommunityList,
  createCommunity,
  removeCommunity,
  updateCommunity,
};
