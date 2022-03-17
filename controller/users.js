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

const updateUserInfo = async (id, realName, uphone) => {
  const result = await users.update(
    { realName: realName, uphone: uphone },
    {
      where: {
        id: id,
      },
    }
  );
  return result[0] ? new SuccessModel('修改成功') : new ErrorModel('修改失败');
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
  return result[0] ? new SuccessModel('修改成功') : new ErrorModel('修改失败');
};

module.exports = { login, getUserInfo, updateUserInfo, updateUserAvatar };
