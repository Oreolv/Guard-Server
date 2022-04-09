const { Op } = require('sequelize');
const Users = require('../database/model/users');
const Role = require('../database/model/role');
const { SuccessModel, ErrorModel } = require('../model/response');
const jsonwebtoken = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret');

const login = async (username, password) => {
  if (username === '' || password === '') {
    return new ErrorModel('账号或密码为空');
  }
  const ret = await Users.findOne({
    where: { username },
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'roleName', 'roleValue'],
      },
    ],
  });
  if (!ret) {
    return new ErrorModel('用户不存在');
  }
  if (ret.password === password) {
    const token = jsonwebtoken.sign(
      {
        id: ret.id,
        roleId: ret.roleId,
        userType: 'users',
      },
      jwtSecret,
      { expiresIn: '30d' } // zeit/ms规范
    );
    const result = {
      token: token,
      userId: ret.id,
      roles: ret.roles,
    };
    return new SuccessModel('登陆成功', result);
  } else {
    return new ErrorModel('密码错误');
  }
};

const getUserInfo = async id => {
  const ret = await Users.findOne({
    where: { id: id },
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'roleName', 'roleValue'],
      },
    ],
  });
  return new SuccessModel('获取成功', ret);
};

const getUserList = async (username = '', roleValue = '') => {
  const userWhereObject = {};
  if (username) {
    userWhereObject.username = { [Op.like]: `%${username}%` };
  }
  if (roleValue) {
    userWhereObject.roleId = roleValue;
  }
  const ret = await Users.findAll({
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'roleName', 'roleValue'],
      },
    ],
    where: userWhereObject,
  });
  return new SuccessModel('获取成功', ret);
};

const updateUserInfo = async params => {
  const result = await Users.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('用户信息修改成功', result);
};

// 用户管理页面更改用户信息
const updateUserSys = async params => {
  const result = await Users.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('用户信息修改成功', result);
};

const updateUserAvatar = async (id, avatar) => {
  const result = await Users.update(
    { avatar: avatar },
    {
      where: {
        id: id,
      },
    }
  );
  return result[0]
    ? new SuccessModel('用户头像修改成功')
    : new ErrorModel('用户头像修改失败');
};

const updateUserPassword = async (id, passwordOld, passwordNew) => {
  const ret = await Users.findOne({
    where: { id: id },
  });
  if (ret.password !== passwordOld) {
    return new ErrorModel('当前账户密码错误');
  }
  const result = await Users.update(
    { password: passwordNew },
    {
      where: {
        id: id,
      },
    }
  );
  return result[0]
    ? new SuccessModel('用户密码修改成功')
    : new ErrorModel('用户密码修改失败');
};

const createNewUser = async params => {
  params.password = '123456';
  const user = await Users.create(params);
  return new SuccessModel('创建成功', user);
};

const removeUser = async id => {
  const ret = await Users.destroy({
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

module.exports = {
  login,
  getUserInfo,
  getUserList,
  createNewUser,
  updateUserSys,
  updateUserInfo,
  removeUser,
  updateUserAvatar,
  updateUserPassword,
};
