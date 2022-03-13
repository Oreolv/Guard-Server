const { ErrorModel } = require('../model/response');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const { jwtSecret } = require('../config/secret');

module.exports = function () {
  return async function (ctx, next) {
    try {
      const token = ctx.header.authorization;
      if (token) {
        const payload = await verify(token.split(' ')[1], jwtSecret);
        ctx.user = {
          openid: payload.openid,
        };
      }
      await next();
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = new ErrorModel('登陆认证失败，缺少token信息', 401);
      } else {
        ctx.status = 500;
        ctx.body = new ErrorModel('未知错误');
        console.log(err);
      }
    }
  };
};
