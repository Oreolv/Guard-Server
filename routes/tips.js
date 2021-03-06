const router = require('koa-router')();
const {
  getTipsList,
  createTips,
  removeTips,
  updateTips,
} = require('../controller/tips');
router.prefix('/api/tips');

router.get('/getTipsList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  if (params.keyword) {
    params.page = 1;
    params.pageSize = 100;
  }
  const result = await getTipsList(params);
  ctx.body = result;
});

router.post('/createTips', async function (ctx, next) {
  const params = ctx.request.body;
  params.publisher = ctx.user.userId;
  const result = await createTips(params);
  ctx.body = result;
});

router.delete('/removeTips', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeTips(id);
  ctx.body = result;
});

router.put('/updateTips', async function (ctx, next) {
  const params = ctx.request.body;
  const result = await updateTips(params);
  ctx.body = result;
});

module.exports = router;
