const router = require('koa-router')();
const {
  getMaterialList,
  getMaterialDetail,
  createMaterial,
  removeMaterial,
  updateMaterial,
} = require('../controller/material');
router.prefix('/material');

router.get('/getMaterialList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  params.applicant = Number(ctx.user.userId);
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
  const { id } = ctx.user;
  const params = ctx.request.body;
  params.approver = id;
  params.approveTime = new Date();
  const result = await updateMaterial(params);
  ctx.body = result;
});

module.exports = router;
