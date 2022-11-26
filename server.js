const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
    host: '127.0.0.1',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Hei777888',
    database: 'election'
    },
    //     console.log('Connected to the election database.')

);

//database query for all rows/candidates

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);     
// });

//database query for single row/candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err){
        console.log(err);
    }
    console.log(row);
});

//database query to delete single row/candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, results) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(results);
// });

// database query to create single row/candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?,?,?,?)`;

const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, results) => {
    if (err){
        console.log(err);
    }
    console.log(results);
});


// catchcall route, must go at bottom of previous calls 
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});