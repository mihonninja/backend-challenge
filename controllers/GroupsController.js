const uuid4 = require("uuid4")

GroupsController = {
  upsertGroup: async ({ groupName, ctx }) => {
    console.log('DatabaseController::insertNewGroup called: ', groupName)
    const query = { name: groupName }
    const update = {
      $set: {
        _id: uuid4(),
        name: groupName,
      },
      $setOnInsert: {
        createdAt: new Date().valueOf(),
      }
    }
    const options = { upsert: true }
    await ctx.db.collection('group').updateOne(query, update, options)
  },


  findGroupByName: async ({ groupName, ctx }) => {
    const group = await ctx.db.collection('group').findOne({ name: groupName })
    if (!group) {
      throw new Error(`Group with name ${groupName} was not found`)
    }

    return group
  },

}

module.exports = GroupsController
