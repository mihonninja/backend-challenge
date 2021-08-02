import app from '../../index'
import request from 'supertest'
import GroupsController from '../../controllers/GroupsController'
import InstancesController from '../../controllers/InstancesController'
import { Group } from '../../models/group.model'
import { Instance } from '../../models/instance.model'



const instancesCount = 13
const date = Date.now()
const group = {
  _id: 'some',
  name: 'groupName',
  createdAt: date,
  updatedAt: date
}


const instance = {
  _id: 'instanceId',
  groupName: group.name,
  groupId: group._id,
  createdAt: date,
  updatedAt: date,
  meta: {
    someMeta: 100
  }
}


Date.prototype.valueOf = jest.fn(() => {
  return date
})


Group.find = jest.fn(() => { return [group] })
Instance.findOneAndUpdate = jest.fn(() => { return instance })


GroupsController.findGroupByName = jest.fn(() => { return group })
InstancesController.findInstancesCountByGroupId = jest.fn(() => { return instancesCount })
InstancesController.findLastUpdatedAtForGroup = jest.fn(() => { return date })
InstancesController.findInstancesByGroupName = jest.fn(() => { return [instance] })
InstancesController.removeInstance = jest.fn(() => {})


describe('GET / ', () => {
  it('Receives updated groups list information', async () => {
    const result = await request(app.callback()).get('/')
    expect(JSON.parse(result.text)).toEqual([{
      id: group._id,
      instances: instancesCount,
      createdAt: date,
      name: group.name,
      lastUpdatedAt: date
    }])
    expect(result.statusCode).toEqual(200)
  })
})


describe('GET /:group', () => {
  it('Receives group information', async () => {
    const result = await request(app.callback()).get('/groupName')
    expect(JSON.parse(result.text)).toEqual([instance])
    expect(result.statusCode).toEqual(200)
  })
})


describe('POST /:group/:id', () => {
  it('Creates a new instance in group', async () => {
    const result = await request(app.callback())
      .post('/groupName/instanceId')

    expect(JSON.parse(result.text)).toEqual({
      id: instance._id,
      group: group.name,
      meta: {},
      createdAt: date,
      updatedAt: date
    })
    expect(result.statusCode).toEqual(200)
  })
})


describe('DELETE /:group/:id', () => {
  it('Removes instance of a group', async () => {
    const result = await request(app.callback()).delete('/groupName/instanceId')
    expect(result.statusCode).toEqual(200)
  })
})


describe('POST /:group', () => {
  it('Creates a new group', async () => {
    const result = await request(app.callback())
      .post('/groupName')

    expect(result.text).toEqual(`{}`)
    expect(result.statusCode).toEqual(200)
  })
})