require('dotenv').config()


const DatabaseController = require('./database/DatabaseController')
const Koa = require('koa')
const router = require('./routes/index')
const bodyParser = require('koa-bodyparser')
require('./jobs/index')

const app = new Koa()


app
  .use(DatabaseController.getMongoConfig())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx, next) => {
    ctx.db === ctx.mongo.db(process.env.DB_NAME)
    ctx.body = ctx.request.body

  })

app.listen(process.env.APP_PORT)