import { connect, connection as db } from 'mongoose'




const DatabaseController = {
  init (): void {
    const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    console.log('Database url: ', url)
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }

    db.on('close', () => console.log('Database connection closed.'))
    connect(url, options)
  },
}


export default DatabaseController;