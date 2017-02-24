'use strict';

angular.module('MV.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome',{
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject' , '$location',
function($scope, CommonProp, $firebaseArray,$firebaseObject,$location){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var ref = firebase.database().ref().child('Entradas');
	$scope.articles = $firebaseArray(ref);
	console.log($scope.articles);	

	$scope.editPost = function(id){
		var ref = firebase.database().ref().child('Entradas/' + id);
		$scope.editPostData = $firebaseObject(ref);
		console.log($scope.editPostData);
	};

	$scope.updatePost = function(id){
		var ref = firebase.database().ref().child('Entradas/' + id);
		var historia_adopcion;
		if($scope.editPostData.historia_adopcion==undefined || $scope.editPostData.adoptada=="No"){
				$scope.editPostData.historia_adopcion=null;
			}
		ref.update({
			nombre: $scope.editPostData.nombre,
			apellido: $scope.editPostData.apellido,
			cedula: $scope.editPostData.cedula,
			telefono: $scope.editPostData.telefono,
			nombre_mascota: $scope.editPostData.nombre_mascota,
			tipo_mascota: $scope.editPostData.tipo_mascota,
			edad_mascota: $scope.editPostData.edad_mascota,
			historia_mascota: $scope.editPostData.historia_mascota,
			adoptada: $scope.editPostData.adoptada,
			historia_adopcion: $scope.editPostData.historia_adopcion
		}).then(function(ref){
				$("#editModal").modal('hide');
		},function(error){
			console.log(error);
		});
	};

	$scope.deleteConfir = function(article){
		$scope.deleteEntrada = article;
	};
	
	$scope.deletePost = function(deleteEntrada){
		$scope.articles.$remove(deleteEntrada);
		$("#deleteModal").modal('hide');
	};

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
	
}])