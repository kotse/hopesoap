var hopesoapApp = angular.module('hopeSoapApp', []);

hopesoapApp.controller('SoapListCtrl', function ($scope) {
  $scope.soaps = [
    {'name': 'Luxury',
     'description': 'Луксозни сапуни за вашия специален повод'},
    {'name': 'Christmas special',
     'description': 'Коледа'},
    {'name': 'Classic',
     'description': 'Класически модели сапуни'},
  ];
});