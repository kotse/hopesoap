var hopesoapApp = angular.module('hopeSoapApp', []);

hopesoapApp.controller('SoapListCtrl', function ($scope) {
  $scope.soaps = [
    {'name': 'Luxury',
     'description': 'Луксозни сапуни за вашия специален повод',
 	 'createdAt': new Date('12/23/2013')},
    {'name': 'Christmas special',
     'description': 'Коледа',
 	 'createdAt': new Date('11/24/2013')},
    {'name': 'Classic',
     'description': 'Класически модели сапуни',
 	 'createdAt': new Date('07/08/2014')},
  ];
});