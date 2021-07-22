const DatabaseController = require('../database/DatabaseController')

GroupsController = {
  createNewGroup: ({ groupName, ctx }) => {
    DatabaseController.insertNewGroup({ groupName, ctx })
  }
}

module.exports = GroupsController