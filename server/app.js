const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
    user: process.env.DB_USER || 'sql12817882',
    password: process.env.DB_PASSWORD || 'XAR8lZHaZ5',
    database: process.env.DB_NAME || 'sql12817882',
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) console.log('Error conntecting to db',err);
    else console.log('Database connected');
});

app.post('/api/contact', (req, res) => {
    console.log("recieved post request",req.body)
    const { name, email, message } = req.body;
    db.query('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', 
             [name, email, message], 
             (err) => {
        if (err) {
            console.log("database error",err)
            res.json({error:'error'})
        } else{
            res.join({message:'message sent'});
        }
    });
});

app.get('/api/messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) res.json({ error: 'Error' });
        else res.json(results);
    });
});

app.use(express.static('public'));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
}

app.listen(PORT, () => console.log('Server running on port ' + PORT));
