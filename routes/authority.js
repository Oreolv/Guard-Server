const router = require('koa-router')();
const { getAuthInfo } = require('../controller/authority');
router.prefix('/auth');

router.get('/getAuthInfo', async function (ctx, next) {
  const result = await getAuthInfo(ctx.user.roleValue);
  ctx.body = result;
});

module.exports = router;
