const GroupsController = require('../controllers/GroupsController')




InstancesController = {
  upsertInstance: async ({ groupName, instanceId, meta, ctx }) => {
    console.log('DatabaseController::insertNewInstance called: ', groupName, instanceId, meta)

    const group = await GroupsController.findGroupByName({ groupName, ctx })
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

    const instance = await InstancesController.findInstanceById({ instanceId, ctx })
    return {
      id: instanceId,
      group: groupName,
      meta,
      createdAt: instance.createdAt,
      updatedAt: updatedAt
    }
  },


  findInstanceById: async ({ instanceId, ctx }) => {
    const instance = await ctx.db.collection('instances').findOne({ _id: instanceId })
    if (!instance) {
      throw new Error(`Instance with _id ${instanceId} was not found`)
    }

    return instance
  },


  removeInstance: async ({ instanceId, ctx }) => {
    const deletionResult = await ctx.db.collection('instances').deleteOne({ _id: instanceId })
    console.log('Deleted instances count: ', deletionResult.deletedCount)
  },
}

module.exports = InstancesController
