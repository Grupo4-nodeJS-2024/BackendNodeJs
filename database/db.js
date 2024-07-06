const mysql = require('mysql2');

const conexion = mysql.createConnection({
    /*host: '127.0.0.1',
    user: 'root',
    password: 'jkl45678',
    database:'javascript',
    port: 3306*/

    host: 'mysql-ospostog4js.alwaysdata.net',
    user: '363226_orlando',
    password: 'JNg7HzE2Js)])i}',
    database:'ospostog4js_orlando'

    
    /*host: 'mysql-ospostog4js.alwaysdata.net',
    user: '363226_neria',
    password:'BfwW5.F4~*m6F*p',
    database:'ospostog4js_orlando',
    connectTimeout: 15000*/

    //debug: true,
    //connectTimeout: '30000',
    //port: 3306

});

conexion.connect(err => {
    if (err) {
      console.log("not connected due to error: " + err);
    } else {
      console.log("connected ! connection id is " + conexion.threadId);
    }
  });

  

/*conexion.query("SHOW TABLES", (err, rows) => {
    console.log(rows); //[ {val: 1}, meta: ... ]
        });*/
    

/*conexion.createConnection((error)=>{
    
    if(error){
        console.error('El error de conexion es: '+error.message);
        console.error('Error stack:', error.stack); // Print the full error stack for more details
        return;
        
    };
    console.log('Conectado a la BD MySQL')
});

/*conexion.on('error', (err) => {
    console.error('Database error:', err.message);
    console.error('Error stack:', err.stack); // Print the full error stack for more details
});
*/
