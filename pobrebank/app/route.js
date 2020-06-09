var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider
        .when('/', {
            templateUrl: 'app/views/Login.html',
            controller: 'LoginController',
        })
        .when('/dashboard', {
            templateUrl: 'app/views/Dashboard.html',
            controller: 'DashboardController',
        })
        .when('/sala', {
            templateUrl: 'app/views/Sala.html',
            controller: 'SalaController',
        })
        .otherwise({
            redirectTo: '/'
        });

});