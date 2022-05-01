const { Op } = require('sequelize');
const Visitor = require('../database/model/visitor');
const Users = require('../database/model/users');
const Resident = require('../database/model/resident');
const { SuccessModel } = require('../model/response');

const include = [
  {
    model: Users,
    as: 'approverInfo',
    attributes: ['username', 'real_name', 'avatar'],
  },
  {
    model: Resident,
    as: 'applicantInfo',
    attributes: ['uname', 'uphone', 'cname', 'vname', 'avatar'],
  },
];

const getVisitorList = async params => {
  const whereObj = {};
  if (params.applicant) {
    whereObj.applicant = params.applicant;
  }
  if (params.user.role_id === 4) {
    include[1].where = {
      vname: { [Op.or]: params.user.vname },
    };
  }
  if (params.user.role_id === 3) {
    include[1].where = {
      cname: { [Op.or]: params.user.cname },
    };
  }
  const ret = await Visitor.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit: params.pageSize,
    offset: params.pageSize * (params.page - 1),
    include: include,
    where: whereObj,
  });
  return new SuccessModel('获取成功', ret);
};

const getVisitorDetail = async id => {
  const ret = await Visitor.findOne({
    include: include,
    where: { id },
  });
  return new SuccessModel('获取成功', ret);
};

const createVisitor = async params => {
  const n = await Visitor.create(params);
  return new SuccessModel('创建成功', n);
};

const removeVisitor = async id => {
  const ret = await Visitor.destroy({
    where: {
      id: id,
    },
  });
  return new SuccessModel('删除成功', ret);
};

const updateVisitor = async params => {
  const n = await Visitor.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('修改成功', n);
};
module.exports = {
  getVisitorList,
  getVisitorDetail,
  createVisitor,
  removeVisitor,
  updateVisitor,
};
