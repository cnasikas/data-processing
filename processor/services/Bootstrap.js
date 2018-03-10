import dotenv from 'dotenv'
import blockchain from 'blockchain'

function setENV () {
  dotenv.config()
}

export default async () => {
  setENV()
  const bl = await blockchain()
  return bl
}
