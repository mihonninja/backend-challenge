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


  insertNewGroup: async ({ groupName, ctx }) => {
    console.log('insertNewGroup controller method called: ', groupName)
    const query = {
      _id: (new mongo.ObjectId).toString(),
      name: groupName,
      createdAt: new Date().valueOf(),
    }
    await ctx.db.collection('group').insertOne(query)
  },
}




module.exports = DatabaseController