import Koa from 'koa'
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



async function main (): Promise<void> {
  try {
    await DatabaseController.init()
    console.info(`Connected to database`)

    const port = process.env.APP_PORT
    app.listen(port)
    console.info(`Listening to http://localhost:${port}`)
  } catch (error) {
    console.error(error.toString())
  }
}

main()