
// server.js
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', './views'); // optional if folder is 'views'


// --- Configure MySQL connection ---
const pool = mysql.createPool({
    host: 'localhost',
    user: 'YOUR_USERNAME',         // change if needed
    password: 'YOUR_PASSWORD', // change this
    connectionLimit: 5
});

// --- ROUTE 1: Show all databases ---
app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SHOW DATABASES;');
        const databases = rows.map(r => r.Database);
        res.render('home', { databases });
    } catch (err) {
        res.status(500).send(err.message);
    }
});




// --- ROUTE 2: Show all tables in selected database ---
app.get('/database/:db', async (req, res) => {
    const dbName = req.params.db;
    try {
        const [rows] = await pool.query(`SHOW TABLES FROM \`${dbName}\`;`);
        const tables = rows.map(r => Object.values(r)[0]);
        res.render('tables', { database: dbName, tables });
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// --- ROUTE 3: Show all data from selected table ---
app.get('/database/:db/:table', async (req, res) => {
    const { db, table } = req.params;
    const limit = 20; // records per page
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    try {
        // Get total records
        const [totalRows] = await pool.query(`SELECT COUNT(*) as count FROM \`${db}\`.\`${table}\`;`);
        const totalRecords = totalRows[0].count;
        const totalPages = Math.ceil(totalRecords / limit);

        // Get paginated data
        const [rows] = await pool.query(`SELECT * FROM \`${db}\`.\`${table}\` LIMIT ? OFFSET ?`, [limit, offset]);

        // Get column names
        const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

        res.render('table', { db, table, rows, columns, page, totalPages, database: db });
    } catch (err) {
        res.status(500).send(err.message);
    }
});



// --- Start server ---
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

