const mysql = require ('mysql');

const conexion = mysql.createConnection({
    host: 'mysql-ospostog4js.alwaysdata.net',
    user: '363226_neria',
    password:'BfwW5.F4~*m6F*p',
    database:'ospostog4js_orlando',
})
conexion.connect((error)=>{
    if(error){
        console.error('El error de conexion es: '+error);
        return
    }
    console.log('Conectado a la BD MySQL')
})