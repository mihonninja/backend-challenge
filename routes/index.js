const Router = require('koa-router')
const router = new Router()
const GroupsController = require('../controllers/GroupsController')
const InstancesController = require('../controllers/InstancesController')




router.get('/', async (ctx, next) => {
  ctx.body = 'Hello router'
})


router.post('/:group/:id', async (ctx) => {
  const { group, id } = ctx.request.params
  console.log('/:group/:id route called: ', group, id)

  const requestBody = ctx.request.body
  let meta = {}
  if (requestBody.meta) meta = requestBody.meta

  const instance = await InstancesController.upsertInstance({ groupName: group, instanceId: id, meta, ctx })
  console.log('instance: ', instance)
  ctx.status = 200
  ctx.body = instance
})



router.post('/:group', async (ctx, next) => {
  const { group } = ctx.request.params
  console.log(`/:group route called: ${group}`)

  await GroupsController.upsertGroup({ groupName: group, ctx })
  ctx.body = {}
})


module.exports = router

