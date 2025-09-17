const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize express app
const app = express();

// Configure environment variables
dotenv.config(); // <--- THIS IS THE ONLY LINE YOU NEED TO CHANGE

const PORT = process.env.PORT || 5000;

// Database connection
require('./db/conn');

// Middleware
// Enable CORS for all routes
app.use(cors());
// Parse JSON bodies
app.use(express.json());

app.use(require('./router/auth'));

const consoleURL = (req, res, next) => {
    console.log(`User at URL: localhost:${PORT}${req.url}`);
    next();
};

app.use(consoleURL);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('*', (req, res) => {
    res.status(404).send(`<center><h1>404</h1><h3>The Page you are Looking for is Not Found</h3></center>`);
});

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});