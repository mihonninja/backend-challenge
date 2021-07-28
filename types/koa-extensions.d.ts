import { MongoClient } from "mongodb"
import {Context, Request} from 'koa'


declare namespace KoaExtensions {
  interface KoaContext extends Context {
    db: MongoClient.database
  }
}

export = KoaExtensions;