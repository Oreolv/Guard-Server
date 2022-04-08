const router = require('koa-router')();
const {
  getNoticeList,
  createNotice,
  removeNotice,
  updateNotice,
} = require('../controller/notice');
router.prefix('/notice');

router.get('/getNoticeList', async function (ctx, next) {
  const result = await getNoticeList();
  ctx.body = result;
});

router.post('/createNotice', async function (ctx, next) {
  const params = ctx.request.body;
  params.publisherId = ctx.user.id;
  const result = await createNotice(params);
  ctx.body = result;
});

router.delete('/removeNotice', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeNotice(id);
  ctx.body = result;
});

router.put('/updateNotice', async function (ctx, next) {
  const params = ctx.request.body;
  const result = await updateNotice(params);
  ctx.body = result;
});

module.exports = router;
