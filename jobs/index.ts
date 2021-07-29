import InstancesController from "../controllers/InstancesController";

const CronJob = require('cron').CronJob;


const job = new CronJob(
  '0-59 * * * * *',
  async () => {
    await InstancesController.removeExpiredInstances()
  },
  null,
  true,
  'America/Los_Angeles'
)

job.start()
