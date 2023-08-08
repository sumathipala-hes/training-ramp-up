import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { createConnection } from 'typeorm'

dotenv.config({ path: '../config.env' })
const app: Express = express()

const main = async () => {
  try {
    await createConnection()
    console.log('Connected to postgres')
    //Middleware
    app.use(express.json())
    app.listen(5000, () => {
      console.log(`⚡️[server]: Server is running without errors Now http://localhost:${5000}`)
    })
  } catch (err) {
    console.error('Unable to connecto to postgres')
  }
}

main()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is Running now Correctly')
})
