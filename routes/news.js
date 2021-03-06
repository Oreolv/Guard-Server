const router = require('koa-router')();
const {
  getNewsList,
  createNews,
  removeNews,
  updateNews,
} = require('../controller/news');
router.prefix('/api/news');

router.get('/getNewsList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  if (params.keyword) {
    params.page = 1;
    params.pageSize = 100;
  }
  const result = await getNewsList(params);
  ctx.body = result;
});

router.post('/createNews', async function (ctx, next) {
  const params = ctx.request.body;
  params.publisher = ctx.user.userId;
  const result = await createNews(params);
  ctx.body = result;
});

router.delete('/removeNews', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeNews(id);
  ctx.body = result;
});

router.put('/updateNews', async function (ctx, next) {
  const params = ctx.request.body;
  const result = await updateNews(params);
  ctx.body = result;
});

module.exports = router;
