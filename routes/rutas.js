var express = require('express');
var router = express.Router();
var fs = require('fs');

// llamamos el modulo de la conexion 
var conexion = require('../modelos/mySql');

/* GET users listing. */
router.post('/validar', function(req, res ) {
    
  
            // RECOGE LOS CAMPOS DEL FORMULARIO PARA ENVIARLOS Y VALIDARLOS EN LA CONSULTA

            // usuario
            var usuario = req.body.usuario;
            console.log("usuario" , usuario);

            // contraseña
            var clave = req.body.clave;
            console.log("clave" , clave);
    



            var query = conexion.validarSql(usuario , clave)
            console.log(query)

            connection.query(query, function (err , result){

               console.log(result.length)
                var result = result;
        //              
                if(result.length === 0){
                    res.send(result)
                }
               else{
                   if(result[0].activo === 'SI'){
//                       res.redirect('./templates/proceso.html')
                       res.json(result)
                      
                   }
               } 
//                if(err){
//                    res.send(err)
//                }
//               else{
//                   res.send(result)
//                   }
               

            })
 
});// fin de ruta /validar


router.post('/proceso' , function(req,res){
    
    
            var queryWeb = conexion.serviciosWeb()
            console.log("QUERY WEB" , queryWeb)

            connection.query(queryWeb , function(err , result){

            if(err){
                res.send(err)
                console.log(err)
            }
                else{
                  res.json(result)
                }

            })

    
});// fin ruta

module.exports = router;
