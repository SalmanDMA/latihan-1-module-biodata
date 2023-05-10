require('dotenv').config();

const port = process.env.PORT || 3000;
const db = process.env.DB_HOST || 'localhost';

module.exports = { port, db };
