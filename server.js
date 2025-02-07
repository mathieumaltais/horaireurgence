const path = require('path');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const session = require('express-session');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Session Management
app.use(session({
    secret: 'JaimelesCehval123!', // Use a strong, unique secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Change to true when using HTTPS
}));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'JaimelesCehval123!',
    database: 'shift_scheduler'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// Middleware to Check Authentication
function isAuthenticated(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.redirect('/loginsept-iles.html'); // Redirect to login page
    }
    next();
}

// Routes
// Serve the Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'loginsept-iles.html'));
});

// Handle Login Submission
app.post('/process-login', (req, res) => {
    const { username, password } = req.body;

    // Query the database to check user credentials
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).send('Invalid username or password');
        }

        // Store user details in the session
        req.session.user = { id: user.id, username: user.username, role: user.role };

        // Redirect based on role
        if (user.role === 'master') {
            res.redirect('/master-dashboard');
        } else {
            res.redirect('/dashboard');
        }
    });
});

// Serve the Dashboards
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/master-dashboard', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'master-dashboard.html'));
});

// Fetch All Users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users'; // Assumes a "users" table in the database
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching users');
        } else {
            res.json(results); // Return all users as JSON
        }
    });
});

// Submit Shift Availability
app.post('/availability', (req, res) => {
    const { user_id, date, shift } = req.body;

    if (!user_id || !date || !shift) {
        return res.status(400).send('Missing required fields');
    }

    const query = 'INSERT INTO shifts (user_id, date, shift) VALUES (?, ?, ?)';
    db.query(query, [user_id, date, shift], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding availability');
        } else {
            res.status(201).json({ message: 'Availability added!', id: result.insertId });
        }
    });
});

// Error Handler (must be the last middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
