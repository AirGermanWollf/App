'user restrict';

angular.module('MV.registro', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/registro', {
		templateUrl: 'registro/registro.html',
		controller: 'RegistroCtrl'
	});
}])


.controller('RegistroCtrl', ['$scope', '$firebaseAuth', '$location', function($scope, $firebaseAuth, $location){

	$scope.signUp = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;

        if(username && password){
            var auth =$firebaseAuth();
            auth.$createUserWithEmailAndPassword(username, password).then(function(){
                console.log("Usuario Creado");
                $location.path('/welcome');
            }).catch(function(error){
				$scope.errorMsg = true;
				$scope.errorMessage = error.message;
        });
    }
}

}])