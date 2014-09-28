'use strict';

var services = angular.module('hopeSoapServices', []);

services.service('GetService', ['$http', function($http) {
    var request = function(resourcePath) {
        return function() {
            return $http.get(resourcePath).then(successHandler, errorHandler);
        }
    }

    var successHandler = function(response) {
        return response.data;
    }

    var errorHandler = function() {
        return null;
    }

    this.getCategories = request('/db/categories.json');

    this.getOrders = request('/db/orders.json');

    this.getSoaps = request('/db/soaps.json');
}]);
