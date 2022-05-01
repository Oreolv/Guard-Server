const router = require('koa-router')();
const {
  login,
  getUserInfo,
  getResidentList,
  getResidentInfo,
  updateUserProfile,
  updateResidentInfo,
} = require('../controller/resident');
router.prefix('/resident');

router.post('/login', async function (ctx, next) {
  const { code, profile, uphone } = ctx.request.body;
  profile.uphone = uphone;
  const result = await login(code, profile);
  ctx.body = result;
});

router.get('/getUserInfo', async function (ctx, next) {
  const { userId } = ctx.user;
  const result = await getUserInfo(userId);
  ctx.body = result;
});

router.get('/getResidentList', async function (ctx, next) {
  const params = ctx.query;
  params.page = Number(params.page);
  params.pageSize = Number(params.pageSize);
  const result = await getResidentList(params);
  ctx.body = result;
});

router.get('/getResidentInfo', async function (ctx, next) {
  const { userId } = ctx.query;
  const result = await getResidentInfo(userId);
  ctx.body = result;
});

router.put('/updateUserProfile', async function (ctx, next) {
  const { userId } = ctx.user;
  const profile = ctx.request.body;
  const result = await updateUserProfile(userId, profile);
  ctx.body = result;
});

router.put('/updateResidentInfo', async function (ctx, next) {
  const { userId } = ctx.user;
  const params = ctx.request.body;
  const result = await updateResidentInfo(userId, params);
  ctx.body = result;
});

module.exports = router;
