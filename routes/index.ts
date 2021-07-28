import { Context } from 'koa'
import Router from 'koa-router'
const router: Router = new Router();
import GroupsController from '../controllers/GroupsController'
// const InstancesController = require('../controllers/InstancesController')



router.get('/', async (ctx: Context) => {
  console.log('process.env.APP_PORT: ', process.env.APP_PORT)
  console.log('GET / called ')

  const groups = await GroupsController.findAllGroups()
  ctx.body = groups
  ctx.status = 200
})


// router.get('/:group', async (ctx: Context) => {
//   const { params: { group } } = ctx
//   console.log('GET /:group called ', group)

//   const instances = await InstancesController.findInstancesByGroupName({ groupName: group, ctx })

//   ctx.body = instances
//   ctx.status = 200
// })


// router.post('/:group/:id', async (ctx: Context) => {
//   const { params, request: { body: meta } } = ctx
//   console.log('POST /:group/:id route called with params: ', params)

//   const instance = await InstancesController.upsertInstance({ groupName: params.group, instanceId: params.id, meta, ctx })

//   ctx.body = instance
//   ctx.status = 200
// })


// router.delete('/:group/:id', async (ctx: Context) => {
//   const { params } = ctx
//   console.log('DELETE /:group/:id route called with params: ', params)

//   await InstancesController.removeInstance({ instanceId: params.id, ctx })

//   ctx.status = 200
// })


// router.post('/:group', async (ctx: Context) => {
//   const { params } = ctx
//   console.log('/:group route called with params:', params)

//   await GroupsController.upsertGroup({ groupName: params.group, ctx })
//   ctx.body = `Group with name ${params.group} was added successfully`
// })




export = router
