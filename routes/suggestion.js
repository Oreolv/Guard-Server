const router = require('koa-router')();
const {
  getSuggestionList,
  getSuggestionDetail,
  createSuggestion,
  removeSuggestion,
  updateSuggestion,
} = require('../controller/suggestion');
router.prefix('/api/suggestion');

router.get('/getSuggestionList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  if (params.keyword) {
    params.page = 1;
    params.pageSize = 100;
  }
  const result = await getSuggestionList(params);
  ctx.body = result;
});

router.get('/getSuggestionDetail', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await getSuggestionDetail(id);
  ctx.body = result;
});

router.post('/createSuggestion', async function (ctx, next) {
  const params = ctx.request.body;
  params.applicant = ctx.user.userId;
  params.status = 1;
  const result = await createSuggestion(params);
  ctx.body = result;
});

router.delete('/removeSuggestion', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeSuggestion(id);
  ctx.body = result;
});

router.put('/updateSuggestion', async function (ctx, next) {
  const { userId } = ctx.user;
  const params = ctx.request.body;
  params.approver = userId;
  params.approve_time = new Date();
  const result = await updateSuggestion(params);
  ctx.body = result;
});

module.exports = router;
