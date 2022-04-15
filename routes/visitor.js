const router = require('koa-router')();
const {
  getVisitorList,
  createVisitor,
  removeVisitor,
  updateVisitor,
} = require('../controller/visitor');
router.prefix('/visitor');

router.get('/getVisitorList', async function (ctx, next) {
  const params = ctx.query;
  params.applicant = ctx.userId;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  const result = await getVisitorList(params);
  ctx.body = result;
});

router.post('/createVisitor', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  params.healthCode = params.healthCode.join(',');
  const result = await createVisitor(params);
  ctx.body = result;
});

router.delete('/removeVisitor', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeVisitor(id);
  ctx.body = result;
});

router.put('/updateVisitor', async function (ctx, next) {
  const params = ctx.request.body;
  const result = await updateVisitor(params);
  ctx.body = result;
});

module.exports = router;
