const { MongoClient } = require("mongodb");

const DatabaseController = {
  async init () {
    const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`
    const client = new MongoClient(url)
    return await client.connect()
  },
}


export default DatabaseController;
