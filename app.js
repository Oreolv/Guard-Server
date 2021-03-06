const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const logger = require('koa-logger');
const router = require('koa-router');
const requireDirectory = require('require-directory');
const koajwt = require('koa-jwt');
const { jwtSecret } = require('./config/secret');
const error = require('./middlewares/errorHandler');
const token = require('./middlewares/tokenHandler');
const userLog = require('./middlewares/logHandler');
const path = require('path');
const koaBody = require('koa-body');
// error handler
onerror(app);

// middlewares
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);

app.use(error());
app.use(token());

app.use(
  koajwt({
    secret: jwtSecret,
  }).unless({
    path: [
      /\/login/,
      /\/covid/,
      /\/news\/getNewsList/,
      /\/tips\/getTipsList/,
      /\/risk/,
    ],
  })
);

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, './static'),
      keepExtensions: true,
    },
  })
);

app.use(userLog());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms ${JSON.stringify(ctx.user)}`);
});

// routes
requireDirectory(module, './routes', {
  visit: obj => {
    if (obj instanceof router) {
      app.use(obj.routes());
    }
  },
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
