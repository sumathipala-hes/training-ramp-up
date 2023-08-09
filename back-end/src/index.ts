import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { createConnection } from 'typeorm'
import { createStudentRouter } from './routes/createStudent'
import { Student } from './entities/student'

dotenv.config({ path: '../config.env' })
const app: Express = express()

const main = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abdzak@32116',
      database: 'gridtable',
      entities: [Student],
      synchronize: true,
    })
    console.log('Connected to postgres')
    //Middleware
    app.use(express.json())
    app.use(createStudentRouter)

    app.listen(5000, () => {
      console.log(`⚡️[server]: Server is running without errors Now at the  http://localhost:${5000}`)
    })

    app.get('/', (req: Request, res: Response) => {
      res.send('This one works fine Now')
    })
  } catch (err) {
    console.error('Unable to connecto to postgres')
  }
}

main()
