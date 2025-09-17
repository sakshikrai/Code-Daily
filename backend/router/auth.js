const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Local modules for code execution
const { generatefile } = require('./generatePy');
const { executepy } = require('./executepy');
const { executeDart } = require('./executeDart');
const { generateDartfile } = require('./generateDart');

// Database connection and User model
require('../db/conn');
const User = require('../model/userSchema');

// Middleware to parse URL-encoded bodies (for compiler routes)
router.use(express.urlencoded({ extended: true }));

// ################## Home Route ##################
router.get('/', (req, res) => {
    res.send("Welcome to the Home page from auth.js");
});

// ################## Python Compiler Route ##################
router.post('/runpy', async (req, res) => {
    const { language = "py", code } = req.body;

    if (!code || code.trim() === "") {
        return res.status(400).json({ success: false, error: "Please enter some code to execute." });
    }

    try {
        const filepath = await generatefile(language, code);
        const output = await executepy(filepath);
        return res.json({ filepath, output });
    } catch (err) {
        console.error("Python execution error:", err);
        // Attempt to extract a more user-friendly error message
        const errorMessage = err.toString();
        const errorPattern = /line \d+\s+([^\n]+)/;
        const match = errorMessage.match(errorPattern);
        const realError = match ? match[0].trim() : "An error occurred during execution.";
        
        res.status(500).json({ error: `Execution Error: ${realError}` });
    }
});

// ################## Dart Compiler Route ##################
router.post('/rundart', async (req, res) => {
    const { language = "dart", code } = req.body;

    if (!code || code.trim() === "") {
        return res.status(400).json({ success: false, error: "Please enter some code to execute." });
    }

    try {
        const filepath = await generateDartfile(language, code);
        const output = await executeDart(filepath);
        return res.json({ filepath, output });
    } catch (err) {
        console.error("Dart execution error:", err);
        // Attempt to extract a more user-friendly error message
        const errorPattern = / Error: ([^\n]+)\n([^\n]+)/;
        const errorMessage = err.toString();
        const match = errorMessage.match(errorPattern);
        const realError = match ? match[0].trim() : "An error occurred during execution.";

        res.status(500).json({ error: `Execution Error: ${realError}` });
    }
});

// ################## User Registration Route ##################
router.post('/register', async (req, res) => {
    const { username, email, password, cpassword } = req.body;

    // --- Robust Validation ---
    if (!username || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill all required fields." });
    }
    if (password !== cpassword) {
        return res.status(422).json({ error: "Passwords do not match." });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists." });
        }

        // Create a new user instance
        const user = new User({ username, email, password, cpassword });
        
        // Password hashing is handled by the 'pre-save' middleware in userSchema.js

        await user.save();
        res.status(201).json({ message: "User registered successfully." });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: "An unexpected error occurred during registration." });
    }
});

// ################## User Login Route ##################
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Please provide username and password." });
        }

        const userLogin = await User.findOne({ username: username });

        if (!userLogin) {
            return res.status(400).json({ error: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, userLogin.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }
        
        // --- Generate Token and Set Cookie ---
        const token = await userLogin.generateAuthToken();

        res.cookie("jwt_users_token", token, {
            expires: new Date(Date.now() + 25892000000), // 30 days
            httpOnly: true, // Prevents client-side JS from accessing the cookie
            // secure: process.env.NODE_ENV === 'production' // Uncomment for production with HTTPS
        });

        res.status(200).json({ message: "User login successful." });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "An unexpected error occurred during login." });
    }
});

// ################## User Logout Route ##################
router.get('/logout', (req, res) => {
    console.log("User logout request received.");
    // Clear the cookie by setting an expiration date in the past
    res.clearCookie('jwt_users_token', { path: '/' });
    res.status(200).send('User logout successful.');
});

module.exports = router;