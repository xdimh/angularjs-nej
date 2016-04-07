NEJ.define([
    'pro/index/module'
], function(webapp){
    webapp.controller('HomeController',['$scope',function($scope){
        $scope.test = 'Home';
    }]);
    return webapp;
});