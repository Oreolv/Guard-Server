const router = require('koa-router')();
const { login } = require('../controller/users');
router.prefix('/users');

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const result = await login(username, password);
  ctx.body = result;
});

module.exports = router;
