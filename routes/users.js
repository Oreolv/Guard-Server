const router = require('koa-router')();
const {
  login,
  getUserInfo,
  getUserList,
  removeUser,
  createNewUser,
  updateUserSys,
  updateUserInfo,
  updateUserAvatar,
  updateUserPassword,
} = require('../controller/users');
router.prefix('/users');

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const result = await login(username, password);
  ctx.body = result;
});

router.get('/getUserInfo', async function (ctx, next) {
  const userId = ctx.user.id;
  const result = await getUserInfo(userId);
  ctx.body = result;
});

router.get('/getUserList', async function (ctx, next) {
  const result = await getUserList();
  ctx.body = result;
});

router.put('/updateUserInfo', async function (ctx, next) {
  const userId = ctx.user.id;
  const { realName, uphone } = ctx.request.body;
  const result = await updateUserInfo(userId, realName, uphone);
  ctx.body = result;
});

router.put('/updateUserSys', async function (ctx, next) {
  const { id, username, realName, roleName, roleValue, uphone } =
    ctx.request.body;
  const result = await updateUserSys(
    id,
    username,
    realName,
    roleName,
    roleValue,
    uphone
  );
  ctx.body = result;
});

router.put('/updateUserAvatar', async function (ctx, next) {
  const userId = ctx.user.id;
  const { avatar } = ctx.request.body;
  const result = await updateUserAvatar(userId, avatar);
  ctx.body = result;
});

router.put('/updateUserPassword', async function (ctx, next) {
  const userId = ctx.user.id;
  const { passwordOld, passwordNew } = ctx.request.body;
  const result = await updateUserPassword(userId, passwordOld, passwordNew);
  ctx.body = result;
});

router.post('/createNewUser', async function (ctx, next) {
  const { username, realName, roleName, roleValue, uphone } = ctx.request.body;
  const result = await createNewUser(
    username,
    realName,
    roleName,
    roleValue,
    uphone
  );
  ctx.body = result;
});

router.delete('/removeUser', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeUser(id);
  ctx.body = result;
});

module.exports = router;
