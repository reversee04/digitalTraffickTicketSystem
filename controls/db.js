const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  query: (text, params) => new Promise((resolve, reject) => {
    pool.execute(text, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  }),
};
