const role = require('../database/model/role');
const { SuccessModel, ErrorModel } = require('../model/response');

const getRoleList = async () => {
  const ret = await role.findAll();
  return new SuccessModel('获取成功', ret);
};

const createNewRole = async (role_name, role_value, description) => {
  const roles = await role.create({
    role_name: role_name,
    role_value: role_value,
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

const updateRole = async (id, role_name, role_value, description) => {
  const result = await role.update(
    { role_name: role_name, role_value: role_value, description: description },
    {
      where: {
        id: id,
      },
    }
  );
  return new SuccessModel('修改成功', result);
};

module.exports = { getRoleList, createNewRole, removeRole, updateRole };
