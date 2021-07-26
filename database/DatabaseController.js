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


  upsertGroup: async ({ groupName, ctx }) => {
    console.log('DatabaseController::insertNewGroup called: ', groupName)
    const query = { name: groupName }
    const update = {
      $set: {
        _id: new mongo.ObjectId().toString(),
        name: groupName,
      },
      $setOnInsert: {
        createdAt: new Date().valueOf(),
      }
    }
    const options = { upsert: true }
    await ctx.db.collection('group').updateOne(query, update, options)
  },


  upsertInstance: async ({ groupName, instanceId, meta, ctx }) => {
    console.log('DatabaseController::insertNewInstance called: ', groupName, instanceId, meta)

    const group = await DatabaseController.findGroupByName({ groupName, ctx })
    const query = { _id: instanceId }
    const updatedAt = new Date().valueOf()
    const update = {
      $set: {
        updatedAt,
        meta,
      },
      $setOnInsert: {
        createdAt: new Date().valueOf(),
        groupId: group._id,
      }
    }
    const options = { upsert: true }
    await ctx.db.collection('instances').updateOne(query, update, options)

    const instance = await DatabaseController.findInstanceById({ instanceId, ctx })
    return {
      id: instanceId,
      group: groupName,
      meta,
      createdAt: instance.createdAt,
      updatedAt: updatedAt
    }
  },


  findGroupByName: async ({ groupName, ctx }) => {
    const group = await ctx.db.collection('group').findOne({ name: groupName })
    if (!group) {
      throw new Error(`Group with name ${groupName} was not found`)
    }

    return group
  },


  findInstanceById: async ({ instanceId, ctx }) => {
    const instance = await ctx.db.collection('instances').findOne({ _id: instanceId })
    if (!instance) {
      throw new Error(`Instance with _id ${instanceId} was not found`)
    }

    return instance
  },
}




module.exports = DatabaseController