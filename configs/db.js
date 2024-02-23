const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: "database-1.cvu2c8uscyh8.ap-south-1.rds.amazonaws.com",
  user: process.env.username,
  password: process.env.pass,
  database: "Cointab SE-Assignment",
  port: 3306,
  timeout: 60000
});

db.connect((err) => {
  if (err) {
    console.log(err.message,err.stack);
    return;
  }
  console.log("Connected to db");
});

module.exports = { db };
