const Visitor = require('../database/model/visitor');
const { SuccessModel } = require('../model/response');

const getVisitorList = async params => {
  const ret = await Visitor.findAll({
    where: {
      applicant: params.applicant,
    },
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
  createVisitor,
  removeVisitor,
  updateVisitor,
};
