const router = require('koa-router')();
const {
  getBackList,
  getBackDetail,
  createBack,
  removeBack,
  updateBack,
} = require('../controller/back');
router.prefix('/back');

router.get('/getBackList', async function (ctx, next) {
  const params = ctx.query;
  params.applicant = Number(ctx.user.userId);
  const result = await getBackList(params);
  ctx.body = result;
});

router.get('/getBackDetail', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await getBackDetail(id);
  ctx.body = result;
});

router.post('/createBack', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  params.healthCode = params.healthCode.join(',');
  const result = await createBack(params);
  ctx.body = result;
});

router.delete('/removeBack', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeBack(id);
  ctx.body = result;
});

router.put('/updateBack', async function (ctx, next) {
  const { id } = ctx.user;
  const params = ctx.request.body;
  params.approver = id;
  params.approveTime = new Date();
  const result = await updateBack(params);
  ctx.body = result;
});

module.exports = router;
