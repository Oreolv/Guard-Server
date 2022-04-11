const axios = require('axios');
const { Op } = require('sequelize');
const jsonwebtoken = require('jsonwebtoken');
const Resident = require('../database/model/resident');
const getRecorderName = require('./users').getUserInfo;
const { weappSecret, jwtSecret } = require('../config/secret');
const { SuccessModel, ErrorModel } = require('../model/response');

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

const login = async (code, profile) => {
  let userId;
  const openid = await getOpenID(code);
  if (openid) {
    const data = await Resident.findOne();
    if (data == null) {
      // 新用户自动注册
      const user = await Resident.create({ openid: openid });
      userId = user.id;
      await updateUserProfile(userId, profile);
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
  const data = await Resident.findOne({
    raw: true,
    where: { id: userId },
    attributes: [
      'avatar',
      'nickName',
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
      'healthStatus',
      'isolationStatus',
      'accessStatus',
    ],
  });
  data.profile = {
    avatar: data.avatar,
    nickName: data.nickName,
  };
  delete data.avatar;
  delete data.nickName;
  return new SuccessModel('查询成功', data);
};

const getResidentInfo = async userId => {
  const data = await Resident.findOne({
    where: { id: userId },
  });
  return new SuccessModel('查询成功', data);
};

const getResidentList = async params => {
  const residentWhereObject = {};
  if (params.uname) {
    residentWhereObject.uname = { [Op.like]: `%${params.uname}%` };
  }
  if (params.uphone) {
    residentWhereObject.uphone = { [Op.like]: `%${params.uphone}%` };
  }
  const ret = await Resident.findAll({
    limit: params.pageSize,
    offset: params.pageSize * (params.page - 1),
    where: residentWhereObject,
  });
  return new SuccessModel('查询成功', ret);
};

const updateUserProfile = async (userId, profile) => {
  const user = await Resident.findOne({
    where: {
      id: userId,
    },
  });
  user.set(profile);
  await user.save();
  return new SuccessModel('修改成功', user);
};

const updateResidentInfo = async (recorder, params) => {
  const ret = await getRecorderName(recorder);
  params.recorder = ret.result.realName;
  params.createTime = new Date();
  await Resident.update(params, {
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
