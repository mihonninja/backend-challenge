import { Instance } from '../models/instance.model'
// import { GroupDto, CreateGroupDto } from './dto'



const InstancesController = {
  async findInstancesCountByGroupId (groupId: string): Promise<number> {
    const instancesCount = Instance.countDocuments({ groupId })
    return instancesCount
  }


  // findInstancesCountByGroupId: async (groupId: string) => {
  //   const instancesCount = Instance.countDocuments({ groupId })
  //   return instancesCount
  // },





//   upsertInstance: async ({ groupName, instanceId, meta, ctx }) => {
//     console.log('DatabaseController::insertNewInstance called: ', groupName, instanceId, meta)
//     const group = await GroupsController.findGroupByName({ groupName, ctx })
//     const instanceBeforeUpdate = await InstancesController.findInstanceById({ instanceId, ctx })
//     if (instanceBeforeUpdate && instanceBeforeUpdate.groupId !== group._id) {
//       throw new Error(`Instance with this _id ${instanceId} already created for another group`)
//     }

//     const query = { _id: instanceId }
//     const updatedAt = new Date().valueOf()
//     const update = {
//       $set: {
//         updatedAt,
//         meta,
//       },
//       $setOnInsert: {
//         createdAt: new Date().valueOf(),
//         groupId: group._id,
//       }
//     }
//     const options = { upsert: true }
//     await ctx.db.collection('instances').updateOne(query, update, options)

//     const instance = await InstancesController.findInstanceById({ instanceId, ctx })
//     return {
//       id: instanceId,
//       group: groupName,
//       meta,
//       createdAt: instance.createdAt,
//       updatedAt: updatedAt
//     }
//   },


//   findInstanceById: async ({ instanceId, ctx }) => {
//     const instance = await ctx.db.collection('instances').findOne({ _id: instanceId })
//     if (!instance) {
//       throw new Error(`Instance with _id ${instanceId} was not found`)
//     }

//     return instance
//   },


//   removeInstance: async ({ instanceId, ctx }) => {
//     const deletionResult = await ctx.db.collection('instances').deleteOne({ _id: instanceId })
//     console.log('Deleted instances count: ', deletionResult.deletedCount)
//   },


//   findInstancesCountByGroupId: async ({ groupId, ctx }) => {
//     const instance = await ctx.db.collection('instances').find({ groupId })
//     if (!instance) {
//       throw new Error(`Instance with groupId ${groupId} was not found`)
//     }

//     return instance.count()
//   },


//   findInstancesByGroupName: async ({ groupName, ctx }) => {
//     const group = await GroupsController.findGroupByName({ groupName, ctx })
//     const instances = await ctx.db.collection('instances').find({ groupId: group._id })
//     if (!instances) {
//       throw new Error(`Instances for group ${groupName} not found`)
//     }
//     const fetchedInstances = await instances.toArray()
//     const instancesForRender = await Promise.all(fetchedInstances.map(async (instance) => {
//       instance.group = group.name
//       return instance
//     }))

//     return instancesForRender
//   },
}

export default InstancesController

// module.exports = InstancesController
