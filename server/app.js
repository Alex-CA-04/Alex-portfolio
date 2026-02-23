const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'portfolio_db',
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) console.log('Error');
    else console.log('Database connected');
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.query('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', 
             [name, email, message], 
             (err) => {
        if (err) res.json({ error: 'Error' });
        else res.json({ message: 'Message sent' });
    });
});

app.get('/api/messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) res.json({ error: 'Error' });
        else res.json(results);
    });
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
