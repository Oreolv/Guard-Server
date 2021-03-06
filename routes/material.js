const router = require('koa-router')();
const {
  getMaterialList,
  getMaterialDetail,
  createMaterial,
  removeMaterial,
  updateMaterial,
} = require('../controller/material');
router.prefix('/api/material');

router.get('/getMaterialList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  params.applicant = ctx.user.openid ? Number(ctx.user.userId) : null;
  params.user = ctx.user;
  const result = await getMaterialList(params);
  ctx.body = result;
});

router.get('/getMaterialDetail', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await getMaterialDetail(id);
  ctx.body = result;
});

router.post('/createMaterial', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  const result = await createMaterial(params);
  ctx.body = result;
});

router.delete('/removeMaterial', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeMaterial(id);
  ctx.body = result;
});

router.put('/updateMaterial', async function (ctx, next) {
  const { userId } = ctx.user;
  const params = ctx.request.body;
  params.approver = userId;
  params.approve_time = new Date();
  const result = await updateMaterial(params);
  ctx.body = result;
});

module.exports = router;
