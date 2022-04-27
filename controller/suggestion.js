const { Op } = require('sequelize');
const Suggestion = require('../database/model/suggestion');
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
    attributes: ['uname', 'uphone', 'cname', 'avatar', 'nickName'],
  },
];

const getSuggestionList = async params => {
  const whereObj = params.keyword
    ? { content: { [Op.like]: `%${params.keyword}%` } }
    : null;
  const ret = await Suggestion.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit: params.pageSize,
    offset: params.pageSize * (params.page - 1),
    include: include,
    where: whereObj,
  });
  return new SuccessModel('获取成功', ret);
};

const getSuggestionDetail = async id => {
  const ret = await Suggestion.findOne({
    include: include,
    where: { id },
  });
  return new SuccessModel('获取成功', ret);
};

const createSuggestion = async params => {
  const n = await Suggestion.create(params);
  return new SuccessModel('创建成功', n);
};

const removeSuggestion = async id => {
  const ret = await Suggestion.destroy({
    where: {
      id: id,
    },
  });
  return new SuccessModel('删除成功', ret);
};

const updateSuggestion = async params => {
  const n = await Suggestion.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('修改成功', n);
};
module.exports = {
  getSuggestionList,
  getSuggestionDetail,
  createSuggestion,
  removeSuggestion,
  updateSuggestion,
};
