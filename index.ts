import Koa from 'koa'
import dotenv from 'dotenv'
import DatabaseController from './database/DatabaseController'
import router from './routes/index'
import bodyParser from 'koa-bodyparser'
// require('./jobs/index')

dotenv.config()

const app: Koa = new Koa()


app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())



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