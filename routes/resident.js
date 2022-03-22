const router = require('koa-router')();
const { login } = require('../controller/resident');
router.prefix('/resident');

router.post('/login', async function (ctx, next) {
  const code = ctx.request.body.code;
  const result = await login(code);
  ctx.body = result;
});

module.exports = router;
