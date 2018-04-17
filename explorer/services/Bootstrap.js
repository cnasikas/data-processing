import dotenv from 'dotenv'
import blockchain from 'blockchain'
import db from 'db'

function setENV () {
  dotenv.config()
}

export default async () => {
  setENV()
  const bl = await blockchain()
  const mongo = new db.MongoDB(process.env.DB_HOST, process.env.DB_NAME)
  const database = await mongo.init()
  return {blockchain: bl, db: database}
}
