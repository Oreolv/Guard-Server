const router = require('koa-router')();
const {
  login,
  getUserInfo,
  updateUserProfile,
} = require('../controller/resident');
router.prefix('/resident');

router.post('/login', async function (ctx, next) {
  const code = ctx.request.body.code;
  const result = await login(code);
  ctx.body = result;
});

router.get('/getUserInfo', async function (ctx, next) {
  const { userId } = ctx.user;
  const result = await getUserInfo(userId);
  ctx.body = result;
});

router.put('/updateUserProfile', async function (ctx, next) {
  const { userId } = ctx.user;
  const { avatar, nickName } = ctx.request.body;
  const result = await updateUserProfile(userId, avatar, nickName);
  ctx.body = result;
});

module.exports = router;
