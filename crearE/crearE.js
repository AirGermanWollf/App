'use strict';

angular.module('MV.crearE', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/crearE', {
		templateUrl: 'crearE/crearE.html',
		controller: 'CrearECtrl'
	});
}])

.controller('CrearECtrl', ['$scope', function($scope){


}]);
