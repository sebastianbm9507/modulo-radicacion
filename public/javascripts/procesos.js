angular.module('certificacionWeb',[]).controller('controlProcesos', function($scope , $http){
    
    
    // PETICION WEB QUE DEVUELVE LOS PROCESOS 
        
      $http.post('/proceso').success(function(data){
          
          $scope.procesos = data
          console.log(data)
          
      })  
        
        
    
    
});
