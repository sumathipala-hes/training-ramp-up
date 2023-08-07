import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: '../config.env' })

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is Running now Correctly')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running without errors http://localhost:${port}`)
})
