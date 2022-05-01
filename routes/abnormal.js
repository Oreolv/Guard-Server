const router = require('koa-router')();
const {
  getAbnormalList,
  getAbnormalDetail,
  createAbnormal,
  removeAbnormal,
  updateAbnormal,
} = require('../controller/abnormal');
router.prefix('/abnormal');

router.get('/getAbnormalList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  params.applicant = ctx.user.openid ? Number(ctx.user.userId) : null;
  params.user = ctx.user;
  const result = await getAbnormalList(params);
  ctx.body = result;
});

router.get('/getAbnormalDetail', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await getAbnormalDetail(id);
  ctx.body = result;
});

router.post('/createAbnormal', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  const result = await createAbnormal(params);
  ctx.body = result;
});

router.delete('/removeAbnormal', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeAbnormal(id);
  ctx.body = result;
});

router.put('/updateAbnormal', async function (ctx, next) {
  const { id } = ctx.user;
  const params = ctx.request.body;
  params.approver = id;
  params.approve_time = new Date();
  const result = await updateAbnormal(params);
  ctx.body = result;
});

module.exports = router;
