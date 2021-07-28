// const MongoClient = require("mongodb").MongoClient;
const CronJob = require('cron').CronJob;


const job = new CronJob(
  '0-59 * * * * *',
  async () => {
    // const mongoClient = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`,
    //   { useUnifiedTopology: true }
    // )

  //   mongoClient.connect(async (err, client) => {
  //     if (err) return console.log(err)

  //     const db = client.db(process.env.DB_NAME)
  //     const unixtimeNow = new Date().valueOf()
  //     const secondsToCount = process.env.INSTANCE_AGED_AFTER_SECONDS || 10
  //     const unixtimeToCheck = unixtimeNow - (secondsToCount * 1000)

  //     await db.collection('instances').deleteMany({ updatedAt: { $lte: unixtimeToCheck }})

  //     client.close()
  //   })
  },
  null,
  true,
  'America/Los_Angeles'
)

job.start()
