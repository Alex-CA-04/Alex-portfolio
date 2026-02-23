# Portfolio Website

A simple portfolio website using HTML, CSS, JavaScript, Node.js and MySQL.

## What You Need

- Node.js
- MySQL

## How to Run

### 1. Install Packages

Open terminal in project folder and run:
```
npm install
```

### 2. Setup Database

Open MySQL and run these commands:
```sql
CREATE DATABASE portfolio_db;
USE portfolio_db;

CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Update Database Password

Open `server/app.js` and change:
```javascript
password: ''  // Put your MySQL password here
```

### 4. Start Server

```
npm start
```

### 5. Open Browser

Go to: http://localhost:3000

## Project Files

- `public/index.html` - Main website page
- `public/style.css` - Styling
- `public/script.js` - Contact form code
- `server/app.js` - Server code
- `database.sql` - Database setup

## Features

- Home section
- About section
- Projects section
- Contact form that saves to database

## API Routes

- POST `/api/contact` - Save contact message
- GET `/api/messages` - Get all messages

## Notes

- Server runs on port 3000
- Make sure MySQL is running before starting server
- Change database username/password in app.js if needed
