const axios = require('axios');
const resident = require('../database/model/resident');
const { weappSecret, jwtSecret } = require('../config/secret');
const { SuccessModel, ErrorModel } = require('../model/response');
const jsonwebtoken = require('jsonwebtoken');
const getRecorderName = require('./users').getUserInfo;

const getOpenID = async code => {
  const { data } = await axios({
    method: 'post',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    params: {
      appid: weappSecret.appid,
      secret: weappSecret.secret,
      js_code: code,
      grant_type: 'authorization_code',
    },
  });
  return data.openid;
};

const login = async code => {
  let userId;
  const openid = await getOpenID(code);
  if (openid) {
    const data = await resident.findOne();
    if (data == null) {
      // 新用户自动注册
      const user = await resident.create({ openid: openid });
      userId = user.id;
    } else {
      userId = data.id;
    }
    const token = jsonwebtoken.sign(
      {
        userId,
        openId: openid,
        userType: 'resident',
      },
      jwtSecret,
      { expiresIn: '30d' } // zeit/ms规范
    );
    return new SuccessModel('登陆成功', { token, userId });
  }
  return new ErrorModel('登陆失败');
};

const getUserInfo = async userId => {
  const data = await resident.findOne({
    where: { id: userId },
    attributes: [
      'uname',
      'usex',
      'uphone',
      'cname',
      'vname',
      'bnum',
      'hnum',
      'hname',
      'idCard',
      'company',
      'foreignStatus',
    ],
  });
  return new SuccessModel('查询成功', data);
};

const getResidentInfo = async userId => {
  const data = await resident.findOne({
    where: { id: userId },
  });
  return new SuccessModel('查询成功', data);
};

const getResidentList = async () => {
  const data = await resident.findAll();
  return new SuccessModel('查询成功', data);
};

const updateUserProfile = async (userId, avatar, nickName) => {
  await resident.update(
    { avatar, nickName },
    {
      where: {
        id: userId,
      },
    }
  );
  return new SuccessModel('修改成功');
};

const updateResidentInfo = async (recorder, params) => {
  const ret = await getRecorderName(recorder);
  params.recorder = ret.result.realName;
  params.createTime = new Date();
  await resident.update(params, {
    where: {
      id: params.id,
    },
  });
  return new SuccessModel('修改成功');
};

module.exports = {
  login,
  getUserInfo,
  updateUserProfile,
  updateResidentInfo,
  getResidentList,
  getResidentInfo,
};
