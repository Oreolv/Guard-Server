const { Op } = require('sequelize');
const Users = require('../database/model/users');
const Role = require('../database/model/role');
const Village = require('../database/model/village');
const Community = require('../database/model/community');
const { SuccessModel, ErrorModel } = require('../model/response');
const jsonwebtoken = require('jsonwebtoken');
const { jwtSecret } = require('../config/secret');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10; //配置加盐的位数

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
        attributes: ['id', 'role_name', 'role_value'],
      },
      {
        model: Village,
        attributes: ['id', 'name'],
      },
      {
        model: Community,
        attributes: ['id', 'name'],
      },
    ],
  });
  if (!ret) {
    return new ErrorModel('用户不存在');
  }
  if (bcrypt.compareSync(password + ret.salt, ret.password)) {
    const cname = [];
    const vname = [];
    ret.villages.map(i => {
      vname.push(i.name);
    });
    ret.communities.map(i => {
      cname.push(i.name);
    });

    const token = jsonwebtoken.sign(
      {
        userId: ret.id,
        role_id: ret.role_id,
        cname,
        vname,
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

const getUserInfo = async userId => {
  const ret = await Users.findOne({
    where: { id: userId },
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'role_name', 'role_value'],
      },
      {
        model: Village,
        attributes: ['id', 'name'],
      },
      {
        model: Community,
        attributes: ['id', 'name'],
      },
    ],
  });
  return new SuccessModel('获取成功', ret);
};

const getUserList = async params => {
  const userWhereObject = {};
  if (params.username) {
    userWhereObject.username = { [Op.like]: `%${params.username}%` };
  }
  if (params.role_value) {
    userWhereObject.role_id = params.role_value;
  }
  if (params.withGrid) {
    userWhereObject.role_id = { [Op.notIn]: [4] };
  }
  if (params.onlyGrid) {
    userWhereObject.role_id = 4;
  }
  const ret = await Users.findAll({
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['id', 'role_name', 'role_value'],
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
  if (!bcrypt.compareSync(passwordOld + ret.salt, ret.password)) {
    return new ErrorModel('当前账户密码错误');
  }
  const sl = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(passwordNew + ret.salt, sl);
  const result = await Users.update(
    { password: hash },
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
  const salt = uuid.v1();
  const sl = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash('123456' + salt, sl);
  params.password = hash;
  params.salt = salt;
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
