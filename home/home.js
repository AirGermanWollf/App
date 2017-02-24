'use strict';

angular.module('MV.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', 
function($scope, $firebaseAuth, $location, CommonProp){

    $scope.username = CommonProp.getUser();

    $scope.signIn = function(){
        var username = $scope.user.email;
        var password = $scope.user.password;
        var auth = $firebaseAuth();

        auth.$signInWithEmailAndPassword(username, password).then(function(){
            console.log("Usuario logueado de forma exitosa");
            CommonProp.setUser($scope.user.email);
            $location.path('/welcome');
            $scope.errorMsg = false;
        }).catch(function(error){
            $scope.errorMsg = true;
            $scope.errorMessage = error.message;
        });
    }

}])

.service('CommonProp', ['$location', function($location){
    var user = "";

    return {
        getUser: function(){
            if(user == ""){
				user = localStorage.getItem("userEmail");
			}
            return user;
        },
        setUser: function(value){
            localStorage.setItem("userEmail", value);
            user = value;
        }
    };
}]);