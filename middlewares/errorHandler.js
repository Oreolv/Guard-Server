const { ErrorModel } = require('../model/response');

module.exports = function () {
  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      // TODO: 此错误提示文本不通用
      //   if (error.name === 'SequelizeUniqueConstraintError') {
      //     return new ErrorModel('该角色值已存在');
      //   }
      ctx.status = 500;
      ctx.body = new ErrorModel(err.message, 500);
    }
  };
};
