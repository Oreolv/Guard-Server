const router = require('koa-router')();
const {
  getHealthList,
  getHealthDetail,
  createHealth,
  removeHealth,
  updateHealth,
} = require('../controller/health');
router.prefix('/health');

router.get('/getHealthList', async function (ctx, next) {
  const params = ctx.query;
  params.applicant = Number(ctx.user.userId);
  const result = await getHealthList(params);
  ctx.body = result;
});

router.get('/getHealthDetail', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await getHealthDetail(id);
  ctx.body = result;
});

router.post('/createHealth', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  const result = await createHealth(params);
  ctx.body = result;
});

router.delete('/removeHealth', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeHealth(id);
  ctx.body = result;
});

router.put('/updateHealth', async function (ctx, next) {
  const { id } = ctx.user;
  const params = ctx.request.body;
  params.approver = id;
  params.approve_time = new Date();
  const result = await updateHealth(params);
  ctx.body = result;
});

module.exports = router;
