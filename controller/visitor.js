const Visitor = require('../database/model/visitor');
const { SuccessModel } = require('../model/response');

const getVisitorList = async params => {
  const ret = await Visitor.findAndCountAll({
    order: [['publishTime', 'DESC']],
    limit: params.pageSize,
    offset: params.pageSize * (params.page - 1),
    where: {
      applicant: params.applicant,
    },
    row: true,
  });
  ret.rows.forEach(i => {
    i.mediaInfo = JSON.parse(i.mediaInfo);
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
