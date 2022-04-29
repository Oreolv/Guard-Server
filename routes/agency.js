const router = require('koa-router')();
const {
  getAgencyList,
  getAgencyDetail,
  createAgency,
  removeAgency,
  updateAgency,
} = require('../controller/agency');
router.prefix('/agency');

router.get('/getAgencyList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  params.applicant = ctx.user.openid ? Number(ctx.user.userId) : null;
  const result = await getAgencyList(params);
  ctx.body = result;
});

router.get('/getAgencyDetail', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await getAgencyDetail(id);
  ctx.body = result;
});

router.post('/createAgency', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  const result = await createAgency(params);
  ctx.body = result;
});

router.delete('/removeAgency', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeAgency(id);
  ctx.body = result;
});

router.put('/updateAgency', async function (ctx, next) {
  const { id } = ctx.user;
  const params = ctx.request.body;
  params.approver = id;
  params.approve_time = new Date();
  const result = await updateAgency(params);
  ctx.body = result;
});

module.exports = router;
