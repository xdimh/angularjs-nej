NEJ.define([
    'pro/introduction/module'
],function(webapp){
    webapp.controller('IntroductionController',['$scope',function($scope){
        $scope.test = 'Introduction';
    }]);
    return webapp;
});