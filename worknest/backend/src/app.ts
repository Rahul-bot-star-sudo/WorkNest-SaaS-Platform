import express from 'express'
import cors from 'cors'
import { connectDB } from './db'
import { registerController } from './modules/auth/auth.controller'

const app = express()

app.use(cors({ origin: 'http://localhost:4200' }))
app.use(express.json())

connectDB()

app.post('/register', registerController)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
