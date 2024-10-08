const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'Chiru@2004', // your MySQL password
    database: 'user_registration', // the database you created
});

// Connect to the database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database.');
});

// Route to handle form submission
app.post('/register', (req, res) => {
    const { name, email, password, dob } = req.body;

    // Insert data into the users table
    const query = `INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, password, dob], (err, result) => {
        if (err) {
            res.status(500).send('Error saving user data');
        } else {
            res.status(200).send('User registered successfully');
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
