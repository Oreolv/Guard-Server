const axios = require('axios');
const resident = require('../database/model/resident');
const { weappSecret, jwtSecret } = require('../config/secret');
const { SuccessModel, ErrorModel } = require('../model/response');
const jsonwebtoken = require('jsonwebtoken');

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

module.exports = { login };
