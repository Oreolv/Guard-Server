const Visitor = require('../database/model/visitor');
const Users = require('../database/model/users');
const Resident = require('../database/model/resident');
const { SuccessModel } = require('../model/response');

const include = [
  {
    model: Users,
    as: 'approverInfo',
    attributes: ['username', 'realName', 'avatar'],
  },
  {
    model: Resident,
    as: 'applicantInfo',
    attributes: ['uname', 'uphone', 'cname'],
  },
];

const getVisitorList = async params => {
  const whereObj = {};
  if (params.applicant) {
    whereObj.applicant = params.applicant;
  }

  const ret = await Visitor.findAll({
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
