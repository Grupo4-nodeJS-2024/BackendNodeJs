const express = require("express");
//const fs = require('node: fs');
const path = require("path");
const multer = require("multer");
const routerSql = express.Router();
const db = require("../databases/db");

routerSql.get("/", (req, res) => {
  const grupo = req.query.grupo; //valores válidos: grupo=[hombre, mujer, jovenes]
  const orden = req.query.orden; // valores válidos: orden= [a, d]
  const id = req.query.id; //número de ítem seleccionado
  /*En Todos los casos puede no usarse ningún valor, en ese caso,  muestra la lista de todos los productos.
   *Si se define sólo el orden, dicha lista completa estará ordenada por precio ascendente o descendente
   *Si se elige solo grupo, mostrará la lista de productos para el grupo seleccionado, sin ordenamiento.
   *Si se elige id, no tiene sentido elegir los anteriores, y sirve para seleccionar un producto*/

  var sql = "SELECT * FROM productos"; // SELECT * FROM productos WHERE grupo = ? ORDER BY precio DESC

  const valor = []; //array de referencia para seguridad SQL

  if (grupo != undefined) {
    // Agregado SQL para muestra por grupo
    sql = sql + ` WHERE grupo = ?`;
    valor.push(grupo); // enviamos el valor de grupo al array de referencia
  }

  if (orden != undefined) {
    //Agregado SQL para ordenamiento por precios
    sql = sql + " ORDER BY precio ";
    if (orden != "a") {
      sql = sql + "DESC";
    }
  }

  if (id != undefined) {
    // Agregado SQL para muestra por grupo
    sql = sql + ` WHERE id = ? `;
    valor.push(id); // enviamos el valor de grupo al array de referencia
  }

  console.log(valor);

  db.query(sql, valor, (err, resultado) => {
    //Consulta SQL para presentación en Front End.
    if (err) throw err;
    res.json(resultado);
  });
});

/*********************************************************************************************************************************************************************
 * Sistema de carga de producto:
 * En este caso, una de las líneas que debe tener el formulario de carga de producto es la siguiente:
 *           <form action="/profile" method="post" enctype="multipart/form-data">
 *                  <input type="file" name="nombre_de_campo" />        <-------- Esta es la línea en cuestión, un campo donde seleccionar el archivo. Limitar a .jpg
 *           </form>
 * Esto da como resultado un objeto file, con todos los datos del archivo seleccionado
 * Es muy importante que esto esté definido con claridad en el formulario, pues es la base de la administración
 * del almacenamiento del mismo.
 **********************************************************************************************************************************************************************/

//Configuración de datos para Multer

const uploadDir = "./www/assets/images";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    //console.log("posicion 0 " + file.originalname);
  },
});

const upload = multer({ storage: storage });

routerSql.post("/productos", upload.single("subida"), (req, res) => {   //orden de subida del archivo al "uploadDir"
                                                                        //desde el campo file del formulario
  const fecha = new Date();
  const valor = [
    req.body.nombreProducto,
    req.body.descripcion,
    req.body.grupo,
    req.body.precio,
    req.file.originalname,
    fecha,
  ];
/*Secuencia de Query SQL. Sólo se ejecuta en caso de haber subido correctamente el archivo  anterior*/
  
sql =
    "INSERT INTO productos (nombreProducto, descripcion, grupo, precio, imagen, fecha_creacion ) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, valor, (err, resultado) => {
    //Consulta SQL para presentación en Front End.
    if (err) throw err;
    res.send("Registro correctamente agregado");
  });
});





routerSql.put("/modificar", (req, res) => {
  //Modificación de datos de producto
  const fecha = new Date();
  const valor = [
    req.body.nombreProducto,
    req.body.descripcion,
    req.body.grupo,
    req.body.precio,
    fecha,
    req.query.id,
  ];
  
  sql =
    "UPDATE productos SET nombreProducto = ?, descripcion = ?, grupo = ?, precio = ?, fecha_creacion = ? WHERE id = ?";
  

  db.query(sql, valor, (err, resultado) => {
    //Consulta SQL para presentación en Front End.
    if (err) throw err;
   // res.json(resultado);
  });
  res.send("todo ok");
});


routerSql.put("/eliminar", (req, res) => {
  //Modificación de datos de producto
  const fecha = new Date();
  const id=[req.query.id];

  
  sql =
    "DELETE FROM productos WHERE id = ?";
  

  db.query(sql, id, (err, resultado) => {
    //Consulta SQL para presentación en Front End.
    if (err) throw err;
    res.json(resultado);
  });
});




module.exports = routerSql;
