const Trip = require('../database/model/trip');
const Resident = require('../database/model/resident');
const { SuccessModel } = require('../model/response');

const include = [
  {
    model: Resident,
    as: 'residentInfo',
    attributes: ['uname', 'uphone', 'cname'],
  },
];

const getTripList = async params => {
  const whereObj = {};
  if (params.residentId) {
    whereObj.residentId = params.residentId;
  }

  const ret = await Trip.findAll({
    include: include,
    where: whereObj,
  });
  return new SuccessModel('获取成功', ret);
};

const getTripDetail = async id => {
  const ret = await Trip.findOne({
    include: include,
    where: { id },
  });
  return new SuccessModel('获取成功', ret);
};

const createTrip = async params => {
  const n = await Trip.create(params);
  return new SuccessModel('创建成功', n);
};

const removeTrip = async id => {
  const ret = await Trip.destroy({
    where: {
      id: id,
    },
  });
  return new SuccessModel('删除成功', ret);
};

const updateTrip = async params => {
  const n = await Trip.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('修改成功', n);
};
module.exports = {
  getTripList,
  getTripDetail,
  createTrip,
  removeTrip,
  updateTrip,
};
