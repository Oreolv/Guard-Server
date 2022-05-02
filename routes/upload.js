const router = require('koa-router')();
const { uploadFile } = require('../controller/upload');

router.post('/api/upload', async function (ctx, next) {
  const file = ctx.request.files.file; // 获取上传文件
  const result = await uploadFile(file);
  ctx.body = result;
});

module.exports = router;
