const { writeUlog } = require('../controller/ulog');
const { writeRlog } = require('../controller/rlog');

module.exports = function () {
  return async function (ctx, next) {
    const method = ctx.method;
    if (method === 'GET') {
      await next();
      return;
    }
    const url = ctx.url.includes('?') ? ctx.url.split('?')[0] : ctx.url;
    const group = url.split('/')[1];
    const members = url.split('/')[2];
    const exclude = ['login', 'covid'];
    if (exclude.includes(members)) {
      await next();
      return;
    }
    const params = Object.assign(ctx.request.body || {}, ctx.query || {});
    const data = {
      userId: ctx.user.userId,
      method,
      group,
      members,
      params: JSON.stringify(params),
    };
    if (ctx.user.userType === 'users') {
      await writeUlog(data);
    }
    if (ctx.user.userType === 'resident') {
      await writeRlog(data);
    }
    await next();
  };
};
