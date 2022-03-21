const { ErrorModel } = require('../model/response');

module.exports = function () {
  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        ctx.body = new ErrorModel(`该${ctx.errorKey}已存在`);
      } else {
        ctx.body = new ErrorModel(err.message);
      }
    }
  };
};
