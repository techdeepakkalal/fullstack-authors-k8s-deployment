const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const db = require('./configs/db'); // Import the db connection

const app = express();

app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
   if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
   }
   console.log('Connected to MySQL Database');
});

// Health / API root check
app.get(['/api', '/api/'], (req, res) => {
   res.status(200).json({
      message: "API is running successfully",
      status: "healthy"
   });
});

// Add your routes here
app.use('/api', routes);

module.exports = app;
