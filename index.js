require('dotenv').config()

const DatabaseController = require('./database/DatabaseController')
const Koa = require('koa')
const router = require('./routes/index')

const app = new Koa()


app
  .use(DatabaseController.getMongoConfig())
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx, next) => {
    ctx.db === ctx.mongo.db(process.env.DB_NAME)
  })
  .listen(process.env.APP_PORT)