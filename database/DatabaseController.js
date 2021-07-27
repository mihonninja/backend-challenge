const mongo = require('koa-mongo')



const DatabaseController = {
  getMongoConfig: () => {
    return mongo({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      db: process.env.DB_NAME,
      authSource: process.env.DB_AUTH_SOURCE,
    })
  },
}




module.exports = DatabaseController
