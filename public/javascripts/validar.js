angular.module("validar" , []).controller("validarLogin" , function ($http , $scope){
    
    $scope.validar = function(){
        
        $http.post('/proceso').success(function(data){
            console.log(data) 
           
            $scope.info = data
            
            
                
            })
    }
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
//            if(data[0].activo === 'SI'){
//                window.location.href='/proceso.html';
//            }
//            else{
//                alert("El usuario no existe ");
//            }
//                
            
    
        
        
    
    
    
    
    
    
    
});