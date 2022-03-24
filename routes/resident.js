const router = require('koa-router')();
const { login, getUserInfo } = require('../controller/resident');
router.prefix('/resident');

router.post('/login', async function (ctx, next) {
  const code = ctx.request.body.code;
  const result = await login(code);
  ctx.body = result;
});

router.get('/getUserInfo', async function (ctx, next) {
  const { userId } = ctx.user;
  const result = await getUserInfo(userId);
  ctx.body = result;
});

module.exports = router;
