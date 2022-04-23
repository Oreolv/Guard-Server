const router = require('koa-router')();
const {
  getRoleList,
  createNewRole,
  removeRole,
  updateRole,
} = require('../controller/role');
router.prefix('/role');

router.get('/getRoleList', async function (ctx, next) {
  const result = await getRoleList(ctx.user.role_value);
  ctx.body = result;
});

router.post('/createNewRole', async function (ctx, next) {
  ctx.errorKey = '角色值';
  const { role_name, role_value, description } = ctx.request.body;
  const result = await createNewRole(role_name, role_value, description);
  ctx.body = result;
});

router.delete('/removeRole', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeRole(id);
  ctx.body = result;
});

router.put('/updateRole', async function (ctx, next) {
  ctx.errorKey = '角色值';
  const { id, role_name, role_value, description } = ctx.request.body;
  const result = await updateRole(id, role_name, role_value, description);
  ctx.body = result;
});

module.exports = router;
