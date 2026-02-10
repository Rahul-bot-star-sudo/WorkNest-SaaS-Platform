require('dotenv').config();

const express = require('express');
const cors = require('cors');          // ✅ 1. cors import
const app = express();

/* ✅ 2. CORS middleware — YAHI DALNA HAI */
app.use(cors({
  origin: 'http://localhost:3001',     // React frontend
  credentials: true
}));

app.use(express.json());

// routes
app.use('/auth', require('./src/routes/auth.routes'));
app.use('/setup', require('./src/routes/setup.routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
