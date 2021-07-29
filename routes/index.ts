import { Context } from 'koa'
import Router from 'koa-router'
const router: Router = new Router();
import GroupsController from '../controllers/GroupsController'
import InstancesController from '../controllers/InstancesController'
import { v4 as uuid4 } from 'uuid'



router.get('/', async (ctx: Context) => {
  console.log('process.env.APP_PORT: ', process.env.APP_PORT)
  console.log('GET / called ')

  const groups = await GroupsController.findAllGroups()

  ctx.body = groups
  ctx.status = 200
})


router.get('/:group', async (ctx: Context) => {
  const { params: { group } } = ctx
  console.log('GET /:group called ', group)

  const instances = await InstancesController.findInstancesByGroupName(group)

  ctx.body = instances
  ctx.status = 200
})


router.post('/:group/:id', async (ctx: Context) => {
  const { params, request } = ctx
  console.log('POST /:group/:id route called with params: ', params)

  const meta = JSON.parse(JSON.stringify(request.body)).meta
  const objectMeta = meta ? JSON.parse(meta) : {}
  const instance = await InstancesController.upsertInstance(params.group, params.id, objectMeta)

  ctx.body = instance
  ctx.status = 200
})


router.delete('/:group/:id', async (ctx: Context) => {
  const { params } = ctx
  console.log('DELETE /:group/:id route called with params: ', params)

  await InstancesController.removeInstance(params.id)

  ctx.status = 200
})


router.post('/:group', async (ctx: Context) => {
  const { params } = ctx
  console.log('/:group route called with params:', params)

  const group = {
    _id: uuid4(),
    name: params.group
  }
  await GroupsController.createGroup(group)

  ctx.body = `Group with name ${params.group} was added successfully`
})




export = router
