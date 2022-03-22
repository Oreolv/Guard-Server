const router = require('koa-router')();
const { getAllData } = require('../controller/covid');
router.prefix('/covid');

router.get('/all_data', async function (ctx, next) {
  const result = await getAllData();
  ctx.body = result;
});

module.exports = router;
