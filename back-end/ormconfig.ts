import dotenv from 'dotenv'
dotenv.config({ path: 'config.env' })
import { Student } from './src/entities/student'

export default {
  type: process.env.TYPE,
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Student],
  synchronize: true,
}
