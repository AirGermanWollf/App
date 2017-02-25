'use strict';

angular.module('MV.crearE', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/crearE', {
		templateUrl: 'crearE/crearE.html',
		controller: 'CrearECtrl'
	});
}])

.controller('CrearECtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp',function($scope, $firebaseArray, $location, CommonProp){
 
    $scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var ref = firebase.database().ref().child('Entradas');
	$scope.articles = $firebaseArray(ref);

	$(document).ready(function() {
		var count = 0;
  		if (window.File && window.FileList && window.FileReader) {
		$("#files").on("change", function(e) {
			var files = e.target.files,
			filesLength = files.length;
		for (var i = 0; i < filesLength; i++) {
			count ++;
		}
		if(count>3){
			alert("Solo se pueden subir tres imagenes");
		}else{
			for (var i = 0; i < filesLength; i++) {
			var f = files[i]
			var fileReader = new FileReader();
			fileReader.onload = (function(e) {
			var file = e.target;
			$("<span class=\"pip\">" +
				"<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
				"<br/><span class=\"remove\">Quitar Imagen</span>" +
				"</span>").insertAfter("#files");
			$(".remove").click(function(){
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

$(document).ready(function() {
		var uploader = document.getElementById("uploader");
		var filesFotos = document.getElementById("files");
		$("#fileButton").on("click", function(e) {
			console.log("Entro");
			var files = e.target.files,
			filesLength = files.length;
			for(var i=0; i<2; i++){
				firebase.storage().ref('Fotos/' + $scope.username + "/" + file[i].name)
				storage.put(file[i]);
			}
		})
});


	$scope.createPost = function(){

		var correo = $scope.username;
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
		$location.path('/home');
	};
	
	$scope.remove = function(array, index){
    	array.splice(index, 1);
	};

}]);




             


