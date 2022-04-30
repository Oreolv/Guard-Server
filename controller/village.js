const Village = require('../database/model/village');
const { SuccessModel } = require('../model/response');
const Users = require('../database/model/users');
const Community = require('../database/model/community');

const getVillageList = async () => {
  const ret = await Village.findAll({
    include: [
      {
        model: Users,
        attributes: ['username', 'real_name', 'avatar'],
      },
      {
        model: Community,
        attributes: ['name', 'description'],
      },
    ],
  });
  return new SuccessModel('获取成功', ret);
};

const createVillage = async params => {
  const n = await Village.create(params);
  return new SuccessModel('创建成功', n);
};

const removeVillage = async id => {
  const ret = await Village.destroy({
    where: {
      id: id,
    },
  });
  return new SuccessModel('删除成功', ret);
};

const updateVillage = async params => {
  const n = await Village.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('修改成功', n);
};
module.exports = {
  getVillageList,
  createVillage,
  removeVillage,
  updateVillage,
};
