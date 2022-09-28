require('dotenv').config();
const mariadb = require('mariadb');

console.log('from my sql file', process.env.DB_HOST)
const connection = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.getConnection()
  .then( () => {
    console.log("connected to mariaDB database")
  })
    
module.exports = connection;