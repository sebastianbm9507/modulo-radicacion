// llamamos el modulo mysql para conectarnos con la base de datos
var mysql = require('mysql');
// creamos la conexion a nuestra base de datos con los datos de acceso

/**
Conexión a la Base de Datos:

        IP 200.29.111.193
        usuario: desarrollo
        clave: usaca
        puerto 3306
        
**/

connection = mysql.createConnection ({
    host : '200.29.111.193',
    user : 'desarrollo',
    password : 'usaca',
    database : 'sgdn',
    port : '3306'

}); // fin de createConnection
 
connection.connect(function (error) {
    if(error){
        throw error;
    }else{
        console.log('Se realizo la conexion con la base de datos ');
    } // fin del ese

}); // fin de connection

            // QUERY QUE VALIDA LA INFORMACION DE LOGIN
exports.validarSql = function( usuario , clave ){
//    var query = ''
//
//    connection.query('select activo  from usuarios_vpn where usuario='+"'"+usuario+"' && clave ='" +clave +"'"  , function(err , result){
//       console.log(err)
//       console.log(result)
//    query = result;
//        
////        var query = 'select activo  from usuarios_vpn where usuario='+"'"+usuario+"' && clave ='" +clave +"'" 
//    });// fin query
//    
//    return query;
    
    var query = 'select activo  from usuarios where usuario='+"'"+usuario+"' && clave ='" +clave +"'" + "and acesso like '%V%'";
    return query;
}


// QUERY QUE RECOGE LOS SERVICIOS WEB DISPONIBLES Y ACTIVOS

exports.serviciosWeb = function(){
    
    var queryWeb ='select nombre_ta from control_tipo_procesos where area = '+"'W'"+' and activo='+"'SI'"+'';
    return queryWeb;
    
}

