// var pgp = require('pg-promise')(/*options*/)
// var db = pgp('postgres://serviolee@localhost:5432/postgres')
var pg = require ('pg')
var conString = "postgres://serviolee@localhost:5432/postgres";


var db = new pg.Pool({
  user: "serviolee",
  host: "127.0.0.1",
  database: "postgres",
  port: 5432
});

///************* CREATE DATABASE ************/////


// db.query('SELECT * FROM listings limit 1')
//   .then(function (data) {
//     console.log('DATA:', data)
//   })
//   .catch(function (error) {
//     console.log('ERROR connection to postgresql:', error)
//   })

module.exports = db;