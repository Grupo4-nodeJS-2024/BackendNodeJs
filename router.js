const express = require('express');
const router = express.Router();

const conexion = require ('./database/db');


router.get('/', (req, res)=>{
   res.render('index')

   /* conexion.query ('SELECT * FROM productos', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.send(results);
        }
})*/
})

module.exports = router;