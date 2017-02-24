'use strict';

angular.module('MV.crearE', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/crearE', {
		templateUrl: 'crearE/crearE.html',
		controller: 'CrearECtrl'
	});
}])

.controller('CrearECtrl', ['$scope', '$firebaseArray',  function($scope, $firebaseArray){

	var ref = firebase.database().ref().child('Entradas');
	$scope.articles = $firebaseArray(ref);

	$scope.createPost = function(){

		var nombre = $scope.article.nombre;
		var apellido = $scope.article.apellido;
		var cedula = $scope.article.cedula;
		var telefono = $scope.article.telf;
		var nombre_mascota = $scope.article.nombre_m;
		var tipo_mascota = $scope.article.tipo_m;
		var edad_mascota = $scope.article.edad_m;
		var historia_mascota = $scope.article.historia_m;
		var adoptada = $scope.article.adoptada_m;
		if($scope.article.adoptada_m=="No"){
			var historia_adopcion=null;
		}
		var historia_adopcion = $scope.article.historiaAdop_m;
		
		$scope.articles.$add({
			nombre: nombre,
			apellido: apellido,
			cedula: cedula,
			telefono: telefono,
			nombre_mascota: nombre_mascota,
			tipo_mascota: tipo_mascota,
			edad_mascota: edad_mascota,
			historia_mascota: historia_mascota,
			adoptada: adoptada,
			historia_adopcion: historia_adopcion

		}).then(function(ref){
			console.log(ref);
		}, function(error){
			console.log(error);
		});
	};

}]);




             


