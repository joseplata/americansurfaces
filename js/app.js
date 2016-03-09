var myApp = angular.module('myApp', []);

myApp.controller('AmericanSurfaces', function AmericanSurfaces ($scope, $http) {
	$http.get('data/american_surfaces.json').success(function(data){
		$scope.locations = data;
	});
});