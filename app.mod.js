var app = angular.module('myApp', ['ngRoute'])

app.factory('httpRequestInterceptor', function () {
	return {
		request: function (config) {

			config.headers['MyName'] = 'Ashish';

			return config;
		}
	};
});

app.run(function ($rootScope) {
	$rootScope.aadhaarId = "";
	$rootScope.saCode = "";
	$rootScope.salt = "231456";
})

app.config(["$routeProvider", "$httpProvider", function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
		.when('/', {
			templateUrl: 'fetch.html'
		})
		.when('/index', {
			templateUrl: 'home.html'
		})
		.when('/fetch', {
			templateUrl: 'fetch.html',
			controller: 'FetchController'
		})
		.otherwise({ redirectTo: '/' });

}]);

