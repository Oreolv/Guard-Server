const router = require('koa-router')();
const {
  getTripList,
  getTripDetail,
  createTrip,
  removeTrip,
  updateTrip,
} = require('../controller/trip');
router.prefix('/trip');

router.get('/getTripList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page) || 1;
  params.pageSize = Number(params.pageSize) || 9999;
  params.applicant = Number(ctx.user.userId);
  const result = await getTripList(params);
  ctx.body = result;
});

router.get('/getTripDetail', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await getTripDetail(id);
  ctx.body = result;
});

router.post('/createTrip', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  const result = await createTrip(params);
  ctx.body = result;
});

router.delete('/removeTrip', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeTrip(id);
  ctx.body = result;
});

router.put('/updateTrip', async function (ctx, next) {
  const { id } = ctx.user;
  const params = ctx.request.body;
  params.approver = id;
  params.approveTime = new Date();
  const result = await updateTrip(params);
  ctx.body = result;
});

module.exports = router;
