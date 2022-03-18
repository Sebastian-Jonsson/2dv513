const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "vehicleSharing",
  port: 8889,
});

module.exports = db;
