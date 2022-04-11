const router = require('koa-router')();
const {
  getCommunityList,
  createCommunity,
  removeCommunity,
  updateCommunity,
} = require('../controller/community');
router.prefix('/community');

router.get('/getCommunityList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  const result = await getCommunityList(params);
  ctx.body = result;
});

router.post('/createCommunity', async function (ctx, next) {
  const params = ctx.request.body;
  const result = await createCommunity(params);
  ctx.body = result;
});

router.delete('/removeCommunity', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeCommunity(id);
  ctx.body = result;
});

router.put('/updateCommunity', async function (ctx, next) {
  const params = ctx.request.body;
  const result = await updateCommunity(params);
  ctx.body = result;
});

module.exports = router;
