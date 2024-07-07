require('dotenv').config();
const express = require('express');
const path = require('path');
const bases = require('./rutas/consultassql');
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(cors());
app.use(express.static(path.join(__dirname, '/www')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/rutas', bases);

// Route to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/www', '/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
