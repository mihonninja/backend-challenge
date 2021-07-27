const Router = require('koa-router')
const router = new Router()
const GroupsController = require('../controllers/GroupsController')
const InstancesController = require('../controllers/InstancesController')




router.get('/', async (ctx) => {
  console.log('GET / called ')

  const groups = await GroupsController.findAllGroups({ ctx })

  ctx.body = groups
  ctx.status = 200
})


router.get('/:group', async (ctx) => {
  const { group } = ctx.request.params
  console.log('GET /:group called ', group)

  const instances = await InstancesController.findInstancesByGroupName({ groupName: group, ctx })

  ctx.body = instances
  ctx.status = 200
})


router.post('/:group/:id', async (ctx) => {
  const { group, id } = ctx.request.params
  console.log('POST /:group/:id route called: ', group, id)

  const requestBody = ctx.request.body
  let meta = {}
  if (requestBody.meta) meta = requestBody.meta

  const instance = await InstancesController.upsertInstance({ groupName: group, instanceId: id, meta, ctx })

  ctx.body = instance
  ctx.status = 200
})


router.delete('/:group/:id', async (ctx) => {
  const { group, id } = ctx.request.params
  console.log('DELETE /:group/:id route called: ', group, id)

  await InstancesController.removeInstance({ instanceId: id, ctx })

  ctx.status = 200
})



router.post('/:group', async (ctx) => {
  const { group } = ctx.request.params
  console.log(`/:group route called: ${group}`)

  await GroupsController.upsertGroup({ groupName: group, ctx })
  ctx.body = `Group with name ${group} was added successfully`
})





module.exports = router
