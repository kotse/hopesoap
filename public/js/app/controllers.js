'use strict'

/* Controllers module */
var controllers = angular.module('hopeSoapControllers', ['hopeSoapServices']);

controllers.controller('SoapListCtrl', ['$scope', 'GetService', function ($scope, GetService) {
    GetService.getCategories().then(function(data) {
        $scope.categories = data.categories;
    });

    GetService.getOrders().then(function(data) {
        $scope.orders = data.orders;
    });

    $scope.soaps = GetService.getSoaps().then(function(data) {
        $scope.soaps = data;
    });
}]);
