const router = require('koa-router')();
const { getChinaAreaData } = require('../controller/system');
router.prefix('/api/system');

router.get('/china_area_data', async function (ctx, next) {
  const result = await getChinaAreaData();
  ctx.body = result;
});

module.exports = router;
