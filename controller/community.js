const { Op } = require('sequelize');
const Users = require('../database/model/users');
const Community = require('../database/model/Community');
const { SuccessModel } = require('../model/response');

const getCommunityList = async (name = '') => {
  const whereObject = {};
  if (name) {
    whereObject.name = { [Op.like]: `%${name}%` };
  }

  const ret = await Community.findAll({
    include: [
      {
        model: Users,
        attributes: ['id', 'username', 'realName'],
        through: { attributes: [] },
      },
    ],
    where: whereObject,
  });
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
