'use strict'

/* Controllers module */
var controllers = angular.module('hopeSoapControllers', ['hopeSoapServices']);

controllers.controller('SoapListCtrl', ['$scope', 'GetService', function ($scope, GetService) {
    GetService.getCategories().then(function(data) {
        $scope.categories = data.categories;
    });

    $scope.soaps = GetService.getSoaps().then(function(data) {
        $scope.soaps = data;
    });

	$scope.total = 0;
	$scope.orders = [];

    $scope.addOrder = function (soap) {
    	var order = $scope.findOrderFor(soap);
    	if (order) {
    		$scope.addToOrder(order);
    	} else {
    		order = {};

	    	order.soap = soap;
	    	order.count = 1;
	    	order.total = soap.price;

	    	$scope.orders.push(order);
	    	$scope.total += soap.price;
    	}

    	$scope.checkOrderIsVisible();
    };

    $scope.subFromOrder = function (order) {
		order.count -= 1;
    	order.total -= order.soap.price;

    	$scope.total -= order.soap.price;
    	$scope.checkOrderIsVisible();
    }

    $scope.addToOrder = function (order) {
		order.count += 1;
    	order.total += order.soap.price;

    	$scope.total += order.soap.price;
    }

    $scope.findOrderFor = function (soap) {
    	for (var i=0; i<$scope.orders.length; i++) {
    		var order = $scope.orders[i];
    		if (soap.id == order.soap.id) {
	    		return order;
    		}
    	}

    	return false;
    }

    $scope.checkOrderIsVisible = function() {
    	if ($scope.total > 0) {
	    	$('.order-box').slideDown();	
    	} else {
    		$('.order-box').slideUp();	
    	}
    }
}]);
