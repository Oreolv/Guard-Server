const router = require('koa-router')();
const {
  getCommunityList,
  createNewCommunity,
  removeCommunity,
  updateCommunity,
} = require('../controller/community');
router.prefix('/community');

router.get('/getCommunityList', async function (ctx, next) {
  const { name, username } = ctx.query;
  const result = await getCommunityList(name, username);
  ctx.body = result;
});

router.post('/createNewCommunity', async function (ctx, next) {
  const { name, custodian, username, description } = ctx.request.body;
  const result = await createNewCommunity(
    name,
    custodian,
    username,
    description
  );
  ctx.body = result;
});

router.delete('/removeCommunity', async function (ctx, next) {
  const { id } = ctx.query;
  const result = await removeCommunity(id);
  ctx.body = result;
});

router.put('/updateCommunity', async function (ctx, next) {
  const { id, name, custodian, username, description } = ctx.request.body;
  const result = await updateCommunity(
    id,
    name,
    custodian,
    username,
    description
  );
  ctx.body = result;
});

module.exports = router;
