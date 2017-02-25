'use strict';

angular.module('MV.crearE', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/crearE', {
		templateUrl: 'crearE/crearE.html',
		controller: 'CrearECtrl'
	});
}])

.controller('CrearECtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp',function($scope, $firebaseArray, $location, CommonProp){


	var ref = firebase.database().ref().child('Entradas');
	$scope.articles = $firebaseArray(ref);

	$(document).ready(function() {
		console.log("entro a la primera");
		var count = 0;
  		if (window.File && window.FileList && window.FileReader) {
		$("#files").on("change", function(e) {
			var files = e.target.files,
			filesLength = files.length;
		for (var i = 0; i < filesLength; i++) {
			count ++;
		}
		if(count==0){}
		if($scope.article.email==""){
			alert("Ingresa primero tu correo");
		}
		if(count>3){
			alert("Solo se pueden subir tres imagenes");
		}else{
			var correo = $scope.article.email;
			for (var i = 0; i < filesLength; i++) {
				var storageRef = firebase.storage().ref('Fotos/' + $scope.article.email + "/" + files[i].name)
				storageRef.put(files[i]);
				console.log("Entro en preview");
			var f = files[i]
			var fileReader = new FileReader();
			fileReader.onload = (function(e) {
			var file = e.target;
			$("<span class=\"pip\">" +
				"<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
				"<br/><span class=\"remove"+i+"\">Quitar Imagen</span>" +
				"</span>").insertAfter("#files");
			$(".remove1").click(function(){
				var arrayfiles=document.getElementById("files")
				var deleteRef = storageRef.child('Fotos/' + $scope.article.email + "/" + arrayfiles.getAttribute(1));
				console.log("Remove 1: "+arrayfiles.getAttribute(1))
				// Delete the file
				deleteRef.delete().then(function() {
				// File deleted successfully
				}).catch(function(error) {
				console.log("Uh-oh, an error occurred");
				});
				$(this).parent(".pip").remove();
          });
		  $(".remove2").click(function(){
			  var arrayfiles=$scope.article.fotos;
			  console.log("Remove 1: "+arrayfiles[1].get)
				var deleteRef = storageRef.child('Fotos/' + $scope.article.email + "/" + arrayfiles.getAttribute(2));
				// Delete the file
				deleteRef.delete().then(function() {
				// File deleted successfully
				}).catch(function(error) {
				console.log("Uh-oh, an error occurred");
				});
				$(this).parent(".pip").remove();
          });
		  $(".remove3").click(function(){
			  var arrayfiles=document.getElementById("files")
			  console.log("Remove 1: "+arrayfiles.getAttribute(3))
				var deleteRef = storageRef.child('Fotos/' + $scope.article.email + "/" + arrayfiles.getAttribute(3));
				// Delete the file
				deleteRef.delete().then(function() {
				// File deleted successfully
				}).catch(function(error) {
				console.log("Uh-oh, an error occurred");
				});
				$(this).parent(".pip").remove();
          });
          
        });
        fileReader.readAsDataURL(f);
      }
		}
    });
  } else {
    alert("Your browser doesn't support to File API")
  }
});


	$scope.createPost = function(){

		var correo = $scope.article.email;
		var nombre = $scope.article.nombre;
		var apellido = $scope.article.apellido;
		var cedula = $scope.article.cedula;
		var telefono = $scope.article.telf;
		var nombre_mascota = $scope.article.nombre_m;
		var tipo_mascota = $scope.article.tipo_m;
		var edad_mascota = $scope.article.edad_m;
		var historia_mascota = $scope.article.historia_m;
		var adoptada = $scope.article.adoptada_m;
		if($scope.article.historiaAdop_m==undefined || $scope.article.adoptada_m=="No"){
			$scope.article.historiaAdop_m=null;
		}
		var historia_adopcion = $scope.article.historiaAdop_m;
		var fotos = document.getElementById("files");

		$scope.articles.$add({
			correo:correo,
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
			$scope.success = true;
			window.setTimeout(function() {
				$scope.$apply(function(){
					$scope.success = false;
				});
			}, 2000);
		}, function(e){
			console.log(error);
		});
		$location.path('/crearE');
	};
	
	$scope.remove = function(array, index){
    	array.splice(index, 1);
	};

}]);




             


