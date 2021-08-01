import { Context } from 'koa'
import Router from 'koa-router'
const router: Router = new Router();
import GroupsController from '../controllers/GroupsController'
import InstancesController from '../controllers/InstancesController'
import { v4 as uuid4 } from 'uuid'



router.get('/', async (ctx: Context) => {
  console.log('GET / called ')

  try {
    const groups = await GroupsController.findAllGroups()
    ctx.body = groups
  } catch(e) {
    ctx.body = { errorMessage: e.message }
  }

  ctx.status = 200
})


router.get('/:group', async (ctx: Context) => {
  const { params: { group } } = ctx
  console.log('GET /:group called ', group)

  try {
    const instances = await InstancesController.findInstancesByGroupName(group)
    ctx.body = instances
  } catch(e) {
    ctx.body = { errorMessage: e.message }
  }

  ctx.status = 200
})


router.post('/:group/:id', async (ctx: Context) => {
  const { params, request } = ctx
  console.log('POST /:group/:id called ', params)

  try {
    const requestBody = JSON.parse(JSON.stringify(request.body))
    const objectMeta = requestBody.meta ? JSON.parse(requestBody.meta) : {}
    const instance = await InstancesController.upsertInstance(params.group, params.id, objectMeta)

    ctx.body = instance
  } catch(e) {
    ctx.body = { errorMessage: e.message }
  }

  ctx.status = 200
})


router.delete('/:group/:id', async (ctx: Context) => {
  const { params } = ctx
  console.log('DELETE /:group/:id called ', params)

  try {
    await InstancesController.removeInstance(params.id)
    ctx.body = {}
  } catch(e) {
    ctx.body = { errorMessage: e.message }
  }

  ctx.status = 200
})


router.post('/:group', async (ctx: Context) => {
  const { params } = ctx
  console.log('/:group route called ', params)

  const group = {
    _id: uuid4(),
    name: params.group
  }

  try {
    await GroupsController.createGroup(group)
    ctx.body = {}
  } catch(e) {
    ctx.body = { errorMessage: e.message }
  }

  ctx.status = 200
})




export = router
