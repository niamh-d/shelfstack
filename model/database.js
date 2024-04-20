require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: DB_USER,
  password: DB_PASS,
  database: "shelfstack",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Migration successfully executed!");

    console.log("Closing...");
  });

  con.end();
});
