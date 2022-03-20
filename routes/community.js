const router = require('koa-router')();
const { getCommunityList } = require('../controller/community');
router.prefix('/community');

router.get('/getCommunityList', async function (ctx, next) {
  const result = await getCommunityList();
  ctx.body = result;
});

module.exports = router;
