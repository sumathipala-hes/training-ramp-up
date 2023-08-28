import express, { Express } from 'express'
import { createConnection } from 'typeorm'
import { userRouter } from './routes/userRouter'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import { connectionOptions } from './ormconfig'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app: Express = express()

const main = async () => {
  try {
    await createConnection(connectionOptions)
    console.log('Connected to postgres')
    //Middleware
    app.use(cors())
    app.use(express.json())
    app.use(userRouter)

    const server = http.createServer(app)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
    })

    io.on('connection', (socket) => {
      console.log(`Connected to Socket.io by User ${socket.id}`)

      socket.on('Start', (data) => {
        console.log(data)
      })

      socket.on('newStudent', (data) => {
        socket.broadcast.emit('recievedNewStudent', data)
      })
      socket.on('updateStudent', (data) => {
        socket.broadcast.emit('recievedUpdateStudent', data)
      })
      socket.on('deleteStudent', (data) => {
        socket.broadcast.emit('recievedDeleteStudent', data)
      })
    })

    server.listen(5000, () => {
      console.log(`⚡️[server]: Server is running without errors Now at the  http://localhost:${5000}`)
    })

    // server.get('/', (req: Request, res: Response) => {
    //   res.send('This one works fine Now')
    // })
  } catch (err) {
    console.error(err)
  }
}

main()

export default app
