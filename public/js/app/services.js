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

    this.getCategories = request('/js/app/db/categories.json');

    this.getOrders = request('/js/app/db/orders.json');

    this.getSoaps = request('/js/app/db/soaps.json');
}]);
