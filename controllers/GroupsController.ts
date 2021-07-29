const uuid4 = require("uuid4")

import { IGroup, Group } from '../models/group.model'
import { GroupDTO, CreateGroupDTO } from './dto'
import InstancesController from './InstancesController'




const GroupsController = {
  async findGroupByName(groupName: string): Promise<IGroup> {
    const group = await Group.findOne({ name: groupName })
    if (!group) {
      throw new Error(`Group with name ${groupName} was not found`)
    }

    return group
  },


  async findAllGroups (): Promise<(GroupDTO|null)[]> {
    const groups = await Group.find({})

    const preparedGroups = await Promise.all(groups.map(async (group) => {
      const count = await InstancesController.findInstancesCountByGroupId(group._id)
      if (count <= 0) return null

      const lastUpdatedAt = await InstancesController.findLastUpdatedAtForGroup(group._id)
      const newGroup = {
        id: group._id,
        name: group.name,
        createdAt: group.createdAt,
        instances: count,
        lastUpdatedAt: lastUpdatedAt
      }
      return newGroup
    }))

    const filteredGroups = preparedGroups.filter(_ => _)

    return filteredGroups
  },




  async createGroup (createGroupDto: CreateGroupDTO) {
    await Group.create(createGroupDto)
  },
}

export default GroupsController
