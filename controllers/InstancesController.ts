import { IInstance, Instance } from '../models/instance.model'
import { InstanceDTO } from './dto'
import GroupsController from './GroupsController'



const InstancesController = {
  async findInstancesCountByGroupId (groupId: string): Promise<number> {
    const instancesCount = Instance.countDocuments({ groupId })
    return instancesCount
  },


  async findInstancesByGroupId(groupId: string): Promise<IInstance[]> {
    return await Instance.find({ groupId: groupId }, {}, {sort: {updatedAt: -1}})
  },


  async findInstancesByGroupName (groupName: string): Promise<InstanceDTO[]> {
    const group = await GroupsController.findGroupByName(groupName)
    const instances = await Instance.find({ groupId: group._id })
    if (!instances) {
      throw new Error(`Instances for group ${groupName} not found`)
    }

    const preparedInstances = await Promise.all(instances.map(async (instance) => {
      const newInstance = {
        id: instance._id,
        group: group.name,
        createdAt: instance.createdAt,
        updatedAt: instance.updatedAt,
        meta: instance.meta
      }
      return newInstance
    }))

    return preparedInstances
  },


  async upsertInstance (groupName:string, instanceId:string, meta:object): Promise<InstanceDTO|object> {
    console.log('DatabaseController::insertNewInstance called: ', groupName, instanceId, meta)
    const group = await GroupsController.findGroupByName(groupName)


    const query = { _id: instanceId, groupId: group._id }
    const updatedAt = new Date().valueOf()
    const update = {
      updatedAt,
      meta: meta ? meta : {},

      $setOnInsert: {
        createdAt: new Date().valueOf(),
        groupId: group._id,
      }
    }
    const options = {
      upsert: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
      new: true,
    }
    const instance = await Instance.findOneAndUpdate(query, update, options)

    if (!instance) return {}

    return {
      id: instanceId,
      group: groupName,
      meta,
      createdAt: instance.createdAt,
      updatedAt: updatedAt
    }
  },


  async findInstanceById (instanceId:string):Promise<IInstance | null> {
    const instance = Instance.findOne({ _id: instanceId })
    if (!instance) {
      throw new Error(`Instance with _id ${instanceId} was not found`)
    }

    return instance
  },


  async findLastUpdatedAtForGroup(groupId:string):Promise<number> {
    const instances = await InstancesController.findInstancesByGroupId(groupId)
    if (!instances || instances.length <= 0) return 0
    return instances[0].updatedAt
  },


  async removeInstance(instanceId:string): Promise<void>{
    Instance.deleteOne({ _id: instanceId })
  },
}

export default InstancesController
