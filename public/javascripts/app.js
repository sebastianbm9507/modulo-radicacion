//creamos el modulo e inyectamos bootstrap ui
var app = angular.module('validar', ['ngCookies']);

var informacion = {};
//damos configuración de ruteo a nuestro sistema de login
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
            controller: "loginController",
            templateUrl: "../templates/login.html"
                //        templateUrl : "./index.html"
        })
        .when("/proceso", {
            controller: "homeController",
            templateUrl: "../templates/proceso1.html"
        })
        .otherwise({
            redirectTo: "/"
        })
});

//factoria que controla la autentificación, devuelve un objeto
//$cookies para crear cookies
//$cookieStore para actualizar o eliminar
//$location para cargar otras rutas
app.factory("auth", function ($cookies, $cookieStore, $location, $http, $window) {
    return {
        login: function (username, password) {


            $http.post('/validar', {
                usuario: username,
                clave: password
            }).success(function (data) {
                informacion = data;
                console.log(informacion);

                if (informacion.length === 0) {
                    $window.alert("ERROR : Su usuario o contraseña son incorrectos")
                } else {
                    var letraAcesso = informacion[0].acceso.indexOf('V');
                    console.log('V:', letraAcesso);
                    
                    if (letraAcesso > 0) {

                        $window.alert("MENSAJE: " + "\n" + "Bienvenido usuario -> " + username);
                        //creamos la cookie con el nombre que nos han pasado
                        $cookies.username = username;
                        // $cookieStore.username = username;

                        //                       $window.location.href="../templates/proceso.html";
                        $location.path('/proceso');
                        console.log("ruta ", $window.location.pathname);
                    }
                    else{
                        $window.alert('MENSAJE : Usuario -> '+ username + ' no posee los permisos suficientes para acceder a la aplicacion');
                    }
                }

            });



        },
        logout: function () {

            //            $window.location.href = "../index.html";
            $location.path('/');

        },
        checkStatus: function () {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/proceso", "/dashboard", "/"];
            // en caso de que el usuario intente accerder a los procesos sin estar logueado
            if (this.in_array($location.path(), rutasPrivadas) && typeof ($cookies.username) == "undefined") {
                // $window.alert('Mensaje : ' + '\n' + 'Debe iniciar sesion para poder realizar un proceso , Gracias..');
                $location.path("/");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if (this.in_array("/", rutasPrivadas) && typeof ($cookies.username) != "undefined") {

                $location.path("/proceso");
            }
        },
        in_array: function (needle, haystack) {
            var key = '';
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
            return false;
        }
    }
});




//creamos el controlador pasando $scope y $http, así los tendremos disponibles
app.controller('loginController', function ($scope, auth, $cookieStore, $window) {

    // al cargar la pagina borramos las cookies 
    $cookieStore.remove("username");

    console.log("ruta ", $window.location.pathname);

    $scope.login = function () {
        auth.login($scope.username, $scope.password);
    }

});


//creamos el controlador pasando $scope y auth
app.controller('homeController', function ($scope, $cookies, auth, $window, $http) {
    $http.post('/proceso').success(function (data) {
        $scope.procesos = data
        console.log("Procesos ", $scope.procesos)

    });

    //la función logout que llamamos en la vista llama a la función
    console.log("ruta ", $window.location.pathname);
    //logout de la factoria auth
    $scope.logout = function () {
        auth.logout();
    }

});


//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
app.run(function ($rootScope, auth) {
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function () {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        auth.checkStatus();
    })
})
