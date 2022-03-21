const { ErrorModel } = require('../model/response');

module.exports = function () {
  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      console.log(err);
      switch (err.name) {
        case 'SequelizeUniqueConstraintError':
          ctx.body = new ErrorModel(`该${ctx.errorKey}已存在`);
          break;
        case 'SequelizeDatabaseError':
          ctx.body = new ErrorModel('数据库查询失败');
          break;
        default:
          ctx.body = new ErrorModel(err.message);
      }
    }
  };
};
