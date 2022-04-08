const { Op } = require('sequelize');
const Community = require('../database/model/Community');
const Users = require('../database/model/Users');
const { SuccessModel, ErrorModel } = require('../model/response');

const getCommunityList = async (name = '', custodian = '') => {
  const whereObject = {};
  if (name) {
    whereObject.name = { [Op.like]: `%${name}%` };
  }
  if (custodian) {
    whereObject.custodian = custodian;
  }
  const ret = await Community.findAll({
    include: [
      {
        model: Users,
        as: 'custodianInfo',
        attributes: ['username', 'realName', 'avatar'],
      },
    ],
    where: whereObject,
  });
  return new SuccessModel('获取成功', ret);
};

const createCommunity = async params => {
  await Users.update(
    { cname: params.name },
    {
      where: {
        id: params.custodian,
      },
    }
  );
  await Community.create(params);
  return new SuccessModel('创建成功');
};

const removeCommunity = async id => {
  const ret = await Community.destroy({
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
  await Community.update(params, {
    where: {
      id: params.id,
    },
  });
  await Users.update(
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
