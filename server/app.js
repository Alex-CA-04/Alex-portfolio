const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

function getDB() {
    if (!db) {
        db = mysql.createConnection({
             host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
             user: process.env.DB_USER || 'sql12817882',
              password: process.env.DB_PASSWORD || 'XAR8lZHaZ5',
              database: process.env.DB_NAME || 'sql12817882',
               port: process.env.DB_PORT || 3306

        });
        
        db.connect((err) => {
            if (err) console.log('Error connecting to database:', err);
            else console.log('Database connected');
        });
    }
    return db;
}

app.post('/api/contact', (req, res) => {
    console.log('Received POST request:', req.body);
    const { name, email, message } = req.body;
    const db = getDB();
    db.query('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', 
             [name, email, message], 
             (err) => {
        if (err) {
            console.log('Database error:', err);
            res.json({ error: 'Error' });
        } else {
            res.json({ message: 'Message sent' });
        }
    });
});

app.get('/api/messages', (req, res) => {
    const db = getDB();
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) res.json({ error: 'Error' });
        else res.json(results);
    });
});

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (require.main === module) {
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
}

module.exports = app;



   
