import Koa from 'koa'
declare module 'koa'{
  interface Context {
    db: Object
    body: Object
  }
}

require('dotenv').config()
import DatabaseController from './database/DatabaseController'
const router = require('./routes/index')
const bodyParser = require('koa-bodyparser')
// require('./jobs/index')

const app: Koa = new Koa()


app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

  .use(async (ctx: Koa.Context) => {
    const mongoClient = await DatabaseController.init()
    ctx.db = mongoClient.db(process.env.DB_NAME)
    ctx.body = ctx.request.body

    console.log('ctx: ', ctx)
  })

app.listen(process.env.APP_PORT)