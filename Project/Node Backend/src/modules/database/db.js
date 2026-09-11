// src/modules/database/db.js
const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'worknest',
  port: 5432
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}
