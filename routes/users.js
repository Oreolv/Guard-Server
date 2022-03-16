const router = require('koa-router')();
const { login, getUserInfo, updateUserInfo } = require('../controller/users');
router.prefix('/users');

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const result = await login(username, password);
  ctx.body = result;
});

router.get('/getUserInfo', async function (ctx, next) {
  const userId = ctx.user.id;
  const result = await getUserInfo(userId);
  ctx.body = result;
});

router.put('/updateUserInfo', async function (ctx, next) {
  const userId = ctx.user.id;
  const { realName, uphone } = ctx.request.body;
  const result = await updateUserInfo(userId, realName, uphone);
  ctx.body = result;
});

module.exports = router;
