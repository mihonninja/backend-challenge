const DatabaseController = require('../database/DatabaseController')

GroupsController = {
  upsertGroup: ({ groupName, ctx }) => {
    DatabaseController.upsertGroup({ groupName, ctx })
  }
}

module.exports = GroupsController