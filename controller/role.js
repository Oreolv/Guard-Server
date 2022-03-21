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
  const roles = await role.create({
    roleName: roleName,
    roleValue: roleValue,
    description: description,
    createTime: new Date(),
  });
  return new SuccessModel('创建成功', roles);
};

const removeRole = async id => {
  const ret = await role.destroy({
    where: {
      id: id,
    },
  });
  if (ret) {
    return new SuccessModel('删除成功');
  } else {
    return new ErrorModel('用户不存在');
  }
};

const updateRole = async (id, roleName, roleValue, description) => {
  const result = await role.update(
    { roleName: roleName, roleValue: roleValue, description: description },
    {
      where: {
        id: id,
      },
    }
  );
  return new SuccessModel('修改成功', result);
};

module.exports = { getRoleList, createNewRole, removeRole, updateRole };
