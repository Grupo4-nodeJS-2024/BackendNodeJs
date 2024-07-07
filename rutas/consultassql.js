//const {matematicas} = require('../datos/cursos').infoCursos;

const express = require("express");
/*const fs = require('node: fs');*/
//const multer  = require("multer")
//const upload = multer({ dest: 'uploads/' })

const routerSql = express.Router();

const db = require("../databases/db");

routerSql.get("/", (req, res) => {
  const grupo = req.query.grupo; //valores válidos: grupo=[hombre, mujer, jovenes]
  const orden = req.query.orden; // valores válidos: orden= [a, d]

  /*En ambos casos puede no usarse ningún valor, lo que para el caso de no definir grupo, muestra la lista de todos los productos.
   *Si se define sólo el orden, dicha lista completa estará ordenada por precio ascendente o descendente
   *Si se elige solo grupo, mostrará la lista de productos para el grupo seleccionado, sin ordenamiento.*/


  var sql = "SELECT * FROM productos"; // SELECT *FROM productos WHERE grupo = ? ORDER BY precio DESC

  const valor=[]; //array de referencia para seguridad SQL
  
  if (grupo != undefined) {   // Agregado SQL para muestra por grupo
    sql = sql + ` WHERE grupo = ?`;
    valor.push(grupo);          // enviamos el valor de grupo al array de referencia
  };

  if (orden != undefined) {    //Agregado SQL para ordenamiento por precios
    sql = sql + " ORDER BY precio ";
    if (orden != "a") {
      sql = sql + "DESC";
    };
  };
  

  db.query(sql, valor, (err, resultado) => {   //Consulta SQL para presentación en Front End.
     if (err) throw err
     res.json(resultado);
  });

});

/*routerSql.post("/productos", (req, res) => {   //ingreso de nuevo producto
  console.log(req.body);
  const fecha= new Date();
  const valor = [req.body.nombreProducto, req.body.descripcion, req.body.grupo, req.body.precio, req.body.imagen, fecha];
  console.log(valor);

  sql = "INSERT INTO productos (nombreProducto, descripcion, grupo, precio, imagen, fecha_creacion ) VALUES (?, ?, ?, ?, ?, ?)"

  db.query(sql, valor, (err, resultado) => {   //Consulta SQL para presentación en Front End.
    if (err) throw err
    res.json(resultado);
 });
})*/



/*routerSql.put("/productos", (req, res) => {   //Modificación de datos de producto
  console.log(req.body);
  const fecha= new Date();
  const valor = [req.body.nombreProducto, req.body.descripcion, req.body.grupo, req.body.precio, req.body.imagen, fecha];
  console.log(valor);

  sql = "INSERT INTO productos (nombreProducto, descripcion, grupo, precio, imagen, fecha_creacion ) VALUES (?, ?, ?, ?, ?, ?)"

  db.query(sql, valor, (err, resultado) => {   //Consulta SQL para presentación en Front End.
    if (err) throw err
    res.json(resultado);
 });
})*/

module.exports = routerSql;
// login.js
/*
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);


*/