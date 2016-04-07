NEJ.define([], function () {
    return angular.module('introductionapp',['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/src/admin/modules/home/home.html',
                    controller: 'IntroductionController'
                })
                .when('/about', {
                    templateUrl: '/src/admin/modules/about/about.html',
                    controller: 'IntroductionController'
                })
                .when('/personal', {
                    templateUrl: '/src/admin/modules/personal/personal.html',
                    controller: 'IntroductionController'
                });
        }]);
});