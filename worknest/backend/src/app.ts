import express from 'express'
import cors from 'cors'
import { AuthController } from './modules/auth/auth.controller'

const app = express()

app.use(cors())
app.use(express.json())

const authController = new AuthController()

// ✅ REGISTER ROUTE
app.post('/register', (req, res) => {
  authController.register(req, res)
})

// sanity check
app.get('/', (_, res) => {
  res.send('App working')
})

export default app
