const router = require('koa-router')();
const {
  getVillageList,
  createVillage,
  removeVillage,
  updateVillage,
} = require('../controller/village');
router.prefix('/village');

router.get('/getVillageList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  const result = await getVillageList(params);
  ctx.body = result;
});

router.post('/createVillage', async function (ctx, next) {
  const params = ctx.request.body;
  params.publisher = ctx.user.userId;
  const result = await createVillage(params);
  ctx.body = result;
});

router.delete('/removeVillage', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeVillage(id);
  ctx.body = result;
});

router.put('/updateVillage', async function (ctx, next) {
  const params = ctx.request.body;
  const result = await updateVillage(params);
  ctx.body = result;
});

module.exports = router;
