const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// routes
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// ✅ FIX: Root route (this removes "Cannot GET /")
app.get('/', (req, res) => {
  res.json({
    message: "API is running successfully 🚀",
    availableRoutes: ["/api/items"]
  });
});

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});