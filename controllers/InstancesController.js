const DatabaseController = require('../database/DatabaseController')

InstancesController = {
  upsertInstance: ({ groupName, instanceId, meta, ctx }) => {
    return DatabaseController.upsertInstance({ groupName, instanceId, meta, ctx })
  }
}

module.exports = InstancesController