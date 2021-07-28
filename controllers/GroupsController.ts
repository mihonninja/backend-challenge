const uuid4 = require("uuid4")
import { Context } from 'koa'




const GroupsController = {
  // upsertGroup: async ({ groupName, ctx }) => {
  //   console.log('DatabaseController::insertNewGroup called: ', groupName)
  //   const query = { name: groupName }
  //   const update = {
  //     $set: {
  //       _id: uuid4(),
  //       name: groupName,
  //     },
  //     $setOnInsert: {
  //       createdAt: new Date().valueOf(),
  //     }
  //   }
  //   const options = { upsert: true }
  //   await ctx.db.collection('group').updateOne(query, update, options)
  // },


  // findGroupByName: async ({ groupName, ctx }) => {
  //   const group = await ctx.db.collection('group').findOne({ name: groupName })
  //   if (!group) {
  //     throw new Error(`Group with name ${groupName} was not found`)
  //   }

  //   return group
  // },


  findAllGroups: async (ctx: Context) => {
    // console.log('ctx.db: ', ctx)
    const allGroups = await ctx.db.collection('group').find()

    if (!allGroups) {
      throw new Error(`We don't have any registered groups`)
    }

    const allGroupsArray = await allGroups.toArray()
    const groupsForRender = await Promise.all(allGroupsArray.map(async (group: Object) => {
      return await GroupsController.addInstanceCountToGroup(group, ctx)
    }))

    return groupsForRender.filter(_ => _)
  },


  addInstanceCountToGroup: async (group: Object, ctx: Context) => {
    // const instancesCount = await InstancesController.findInstancesCountByGroupId({ groupId: group._id, ctx })
    // group.instances = instancesCount
    const instancesCount = 10
    if (instancesCount > 0) return group
  },

}

export default GroupsController
