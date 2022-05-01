const util = require('util');
const jwt = require('jsonwebtoken');
const verify = util.promisify(jwt.verify);
const { jwtSecret } = require('../config/secret');
const { ErrorModel } = require('../model/response');

module.exports = function () {
  return async function (ctx, next) {
    try {
      const token = ctx.header.authorization;
      if (token) {
        const payload = await verify(token.split(' ')[1], jwtSecret);
        switch (payload.userType) {
          case 'users':
            ctx.user = {
              userId: payload.userId,
              role_id: payload.role_id,
              cname: payload.cname,
              vname: payload.vname,
              userType: payload.userType,
            };
            break;
          case 'resident':
            ctx.user = {
              userId: payload.userId,
              openId: payload.openId,
              userType: payload.userType,
            };
            break;

          default:
            break;
        }
      }
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = new ErrorModel('登陆认证失败, 缺少token信息', 401);
      }
    } finally {
      await next();
    }
  };
};
