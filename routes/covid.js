const router = require('koa-router')();
const {
  getAllData,
  getRiskArea,
  getRiskAreaMerge,
} = require('../controller/covid');
router.prefix('/covid');

router.get('/all_data', async function (ctx, next) {
  const result = await getAllData();
  ctx.body = result;
});

router.get('/risk_area', async function (ctx, next) {
  const result = await getRiskArea();
  ctx.body = result;
});

router.get('/risk_area_merge', async function (ctx, next) {
  const result = await getRiskAreaMerge();
  ctx.body = result;
});

module.exports = router;
