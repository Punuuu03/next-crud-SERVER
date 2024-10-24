const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from specific origins or any origin for testing purposes
    const allowedOrigins = ["http://localhost:3000", "https://next-crud-client.vercel.app"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies/auth tokens
}));

// Handle preflight (OPTIONS) requests
app.options('*', cors());


app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/api', itemRoutes); // API routes

// MongoDB connection (without deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if MongoDB fails to connect
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
