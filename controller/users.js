const users = require('../database/model/users');
const { SuccessModel, ErrorModel } = require('../model/response');
const jsonwebtoken = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret');

const login = async (username, password) => {
  if (username === '' || password === '') {
    return new ErrorModel('账号或密码为空');
  }
  const ret = await users.findOne({
    where: { username: username },
  });
  if (!ret) {
    return new ErrorModel('用户不存在');
  }
  if (ret.password === password) {
    const token = jsonwebtoken.sign(
      {
        id: ret.id,
        roleValue: ret.roleValue,
      },
      jwtSecret,
      { expiresIn: '30d' } // zeit/ms规范
    );
    const result = {
      token: token,
      userId: ret.id,
      role: [
        {
          roleName: ret.roleName,
          roleValue: ret.roleValue,
        },
      ],
    };
    return new SuccessModel('登陆成功', result);
  } else {
    return new ErrorModel('密码错误');
  }
};

const getUserInfo = async id => {
  const ret = await users.findOne({
    where: { id: id },
  });
  const result = {
    userId: ret.id,
    username: ret.username,
    realName: ret.realName,
    avatar: ret.avatar,
    roles: [
      {
        roleName: ret.roleName,
        roleValue: ret.roleValue,
      },
    ],
    uphone: ret.uphone,
    cname: ret.cname,
    rname: ret.rname,
    bname: ret.bname,
  };
  return new SuccessModel('获取成功', result);
};

const getUserList = async () => {
  const ret = await users.findAll({
    attributes: [
      ['id', 'userId'],
      'username',
      'realName',
      'roleName',
      'roleValue',
      'uphone',
    ],
  });
  return new SuccessModel('获取成功', ret);
};

const updateUserInfo = async (id, realName, uphone) => {
  const result = await users.update(
    { realName: realName, uphone: uphone },
    {
      where: {
        id: id,
      },
    }
  );
  return result[0]
    ? new SuccessModel('用户信息修改成功')
    : new ErrorModel('用户信息修改失败');
};

// 用户管理页面更改用户信息
const updateUserSys = async (
  id,
  username,
  realName,
  roleName,
  roleValue,
  uphone
) => {
  const result = await users.update(
    { id, username, realName, roleName, roleValue, uphone },
    {
      where: {
        id: id,
      },
    }
  );
  return result[0]
    ? new SuccessModel('用户信息修改成功')
    : new ErrorModel('用户信息修改失败');
};

const updateUserAvatar = async (id, avatar) => {
  const result = await users.update(
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
  const ret = await users.findOne({
    where: { id: id },
  });
  if (ret.password !== passwordOld) {
    return new ErrorModel('当前账户密码错误');
  }
  const result = await users.update(
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

const createNewUser = async (
  username,
  realName,
  roleName,
  roleValue,
  uphone
) => {
  const unique = await users.findOne({
    where: { username },
  });
  if (unique) {
    return new ErrorModel('用户名已存在');
  }
  const user = await users.create({
    username,
    password: '123456',
    realName,
    roleName,
    roleValue,
    uphone,
  });
  return new SuccessModel('创建成功', user);
};

const removeUser = async id => {
  const ret = await users.destroy({
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
