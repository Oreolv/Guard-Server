const router = require('koa-router')();
const {
  getRoleList,
  createNewRole,
  removeRole,
} = require('../controller/role');
router.prefix('/role');

router.get('/getRoleList', async function (ctx, next) {
  const result = await getRoleList(ctx.user.roleValue);
  ctx.body = result;
});

router.post('/createNewRole', async function (ctx, next) {
  const { roleName, roleValue, description } = ctx.request.body;
  const result = await createNewRole(roleName, roleValue, description);
  ctx.body = result;
});

router.delete('/removeRole', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeRole(id);
  ctx.body = result;
});

module.exports = router;
