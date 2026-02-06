// index.js
require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
  res.send('Server is running')
})

const setupRoutes = require('./src/routes/setup.routes')
const authRoutes = require('./src/routes/auth.routes')

app.use('/api', setupRoutes)
app.use('/api', authRoutes)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
