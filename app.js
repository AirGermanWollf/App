'use strict';

// Declare app level module which depends on views, and components
angular.module('MV', [
  'ngRoute',
  'MV.home',
  'MV.registro',
  'MV.welcome',
  'MV.crearE'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
