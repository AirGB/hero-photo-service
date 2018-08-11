const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'new_password',
  database: 'hero',

});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to mysql ', err);
  } else {
    console.log('Successful connection to mysql');
  }
});


module.exports = connection;
