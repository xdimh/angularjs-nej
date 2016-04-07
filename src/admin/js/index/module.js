NEJ.define([],
    function () {
    return angular.module('webapp',['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/src/admin/modules/home/home.html',
                    controller: 'HomeController'
                })
                .when('/about', {
                    templateUrl: '/src/admin/modules/about/about.html',
                    controller: 'HomeController'
                })
                .when('/personal', {
                    templateUrl: '/src/admin/modules/personal/personal.html',
                    controller: 'HomeController'
                });
        }]);
});