const router = require('koa-router')();
const {
  getCommunityList,
  createNewCommunity,
} = require('../controller/community');
router.prefix('/community');

router.get('/getCommunityList', async function (ctx, next) {
  const result = await getCommunityList();
  ctx.body = result;
});

router.post('/createNewCommunity', async function (ctx, next) {
  const { name, custodian, description } = ctx.request.body;
  const result = await createNewCommunity(name, custodian, description);
  ctx.body = result;
});

module.exports = router;
