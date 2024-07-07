'use strict';
//const dotenv = require('dotenv').config();
const mysql = require('mysql2');


const conexion = mysql.createPool({
/*  host: process.env.G4_HOSTNAME,
  user: process.env.G4_USER,
  password: process.env.G4_PASSWORD,
  database: process.env.G4_DATABASE,
  port: process.env.G4_PORT*/

  host: process.env.L_HOSTNAME,
  user: process.env.L_USER,
  password: process.env.L_PASSWORD,
  database: process.env.L_DATABASE,
  port: process.env.L_DATABASE_POR
  
   });

//console.log(process.env);

setInterval(() => {
  for (let i = 0; i < 5; ++i) {
    conexion.query((err, rows, fields) => {
      console.log(rows, fields);
      // Connection is automatically released once query resolves
    });
  }
}, 1000);

/*setInterval(() => {
  for (let i = 0; i < 5; ++i) {
    conexion.getConnection((err, db) => {
      db.query('select sleep(0.5) as qqq', (err, rows, fields) => {
        console.log(rows, fields);
        db.release();
      });
    });
  }
}, 1000);*/











module.exports = conexion;
