const Router = require('koa-router')
const router = new Router()
const GroupsController = require('../controllers/GroupsController')
const mongo = require('koa-mongo')



router.get('/', async (ctx, next) => {
  ctx.body = 'Hello router'
})


router.post('/:group/:id', async (ctx) => {
  const { group, id } = ctx.request.params
  console.log('/:group/:id route called: ', group, id)
})


router.post('/:group', async (ctx, next) => {
  const { group } = ctx.request.params
  console.log(`/:group route called: ${group}`)

  await GroupsController.createNewGroup({ groupName: group, ctx })
  ctx.body = {}
})


module.exports = router

