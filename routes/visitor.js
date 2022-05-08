const router = require('koa-router')();
const {
  getVisitorList,
  getVisitorDetail,
  createVisitor,
  removeVisitor,
  updateVisitor,
} = require('../controller/visitor');
router.prefix('/api/visitor');

router.get('/getVisitorList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page) || 1;
  params.pageSize = Number(params.pageSize) || 9999;
  params.applicant = ctx.user.openid ? Number(ctx.user.userId) : null;
  params.user = ctx.user;
  const result = await getVisitorList(params);
  ctx.body = result;
});

router.get('/getVisitorDetail', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await getVisitorDetail(id);
  ctx.body = result;
});

router.post('/createVisitor', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  params.health_code = params.health_code.join(',');
  const result = await createVisitor(params);
  ctx.body = result;
});

router.delete('/removeVisitor', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeVisitor(id);
  ctx.body = result;
});

router.put('/updateVisitor', async function (ctx, next) {
  const { userId } = ctx.user;
  const params = ctx.request.body;
  params.approver = userId;
  params.approve_time = new Date();
  const result = await updateVisitor(params);
  ctx.body = result;
});

module.exports = router;
