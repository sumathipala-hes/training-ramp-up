'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config({ path: '../config.env' })
const app = (0, express_1.default)()
const port = process.env.PORT
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server is Running now Correctly')
})
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running without errors http://localhost:${port}`)
})
