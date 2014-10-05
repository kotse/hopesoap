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

    //holding the state of category filters
    $scope.filter = {};
    $scope.filterByCategory = function (soap) {
        var display = true;
        if (!$scope.filter[soap.category]) {
            display = false;
        }
        return display;
    }

    //order by property is price by default
    $scope.orderByProp = "price";
	$scope.total = 0;
	$scope.orders = [];

    $scope.addOrder = function (soap) {
    	var orderIndex = $scope.findOrderIndex(soap);
    	if (orderIndex > -1) {
    		$scope.addToOrder($scope.orders[orderIndex]);
    	} else {
    		var order = {};

	    	order.soap = soap;
	    	order.count = 1;
	    	order.total = soap.price;

	    	$scope.orders.push(order);
	    	$scope.total += soap.price;
    	}

    	$scope.checkOrdersAreVisible();
    };

    $scope.subFromOrder = function (order) {
		order.count -= 1;
		order.total -= order.soap.price;

		if (order.count == 0) {
			var orderIndex = $scope.findOrderIndex(order.soap);
			$scope.orders.splice(orderIndex, 1);
		}

    	$scope.total -= order.soap.price;
    	$scope.checkOrdersAreVisible();
    }

    $scope.addToOrder = function (order) {
		order.count += 1;
    	order.total += order.soap.price;

    	$scope.total += order.soap.price;
    }

    $scope.findOrderIndex = function (soap) {
		for (var i=0; i<$scope.orders.length; i++) {
    		var order = $scope.orders[i];

    		if (soap.id == order.soap.id) {
    			return i;
    		}
    	}

    	return -1;
    }

    $scope.checkOrdersAreVisible = function() {
    	if ($scope.orders.length > 0) {
	    	$('.order-box').slideDown();	
    	} else {
    		$('.order-box').slideUp();	
    	}
    }
}]);
