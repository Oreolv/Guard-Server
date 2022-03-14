const role = require('../database/model/role');
const { SuccessModel, ErrorModel } = require('../model/response');

const getRoleList = async roleValue => {
  if (roleValue !== 'super' && roleValue !== 'test') {
    return new ErrorModel('无权查看');
  }
  const ret = await role.findAll();
  return new SuccessModel('获取成功', ret);
};

const createNewRole = async (roleName, roleValue, description) => {
  const unique = await role.findOne({
    where: { roleValue: roleValue },
  });
  if (unique) {
    return new ErrorModel('该角色值已存在');
  }
  const roles = await role.create({
    roleName: roleName,
    roleValue: roleValue,
    description: description,
    createTime: new Date(),
  });
  return new SuccessModel('创建成功', roles);
};
module.exports = { getRoleList, createNewRole };
