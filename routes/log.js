const router = require('koa-router')();
const { getRlogList } = require('../controller/rlog');
const { getUlogList } = require('../controller/ulog');

router.prefix('/log');

router.get('/getRlogList', async function (ctx, next) {
  const result = await getRlogList();
  ctx.body = result;
});

router.get('/getUlogList', async function (ctx, next) {
  const result = await getUlogList();
  ctx.body = result;
});

module.exports = router;
