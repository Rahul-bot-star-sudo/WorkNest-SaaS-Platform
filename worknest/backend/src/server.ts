import express from 'express'
import cors from 'cors'
import authRoutes from './modules/auth/auth.routes'
import { connectDatabase } from './config/database.config'

const app = express()

// 🔥 CORS allow (Angular 4200 → Backend 3000)
app.use(cors())

// 🔥 JSON body parse
app.use(express.json())

// 🔥 Auth routes
app.use('/auth', authRoutes)

// 🔥 MongoDB connect
connectDatabase()

// 🔥 Start server
app.listen(3000, () => {
  console.log('🚀 Server running on port 3000')
})
