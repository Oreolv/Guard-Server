const router = require('koa-router')();
const { getRoleList } = require('../controller/role');
router.prefix('/role');

router.get('/getRoleList', async function (ctx, next) {
  const result = await getRoleList(ctx.user.roleValue);
  ctx.body = result;
});

module.exports = router;
