var hopesoapApp = angular.module('hopeSoapApp', []);


//load from a simple web service on the same host
//TODO: add npm module http service so we can start a simple service on localhost to get it
// hopesoapApp.controller('SoapListCtrl', function ($scope) {
// 	$http.get('soaps/soaps.json').success(function(data) {
//     $scope.soaps = data;
//   });
// });


hopesoapApp.controller('SoapListCtrl', function ($scope) {
  $scope.categories = [
  	"Класически",
  	"Луксозни",
  	"Коледа",
  	"Специални случаи",
  	"Фирмени"
  ];

  $scope.orders = [
  	{'name': 'Luxury',
  	 'price': 5,
     'count': 2,
     'total': 10 },
  	{'name': 'Christmas special',
  	 'price': 8,
     'count': 1,
     'total': 8 }
  ];

  $scope.soaps = [
    {'name': 'Luxury',
     'description': 'Луксозни сапуни за вашия специален повод',
     "imageUrl": "img/soaps/soap1.jpg", 
 	 'createdAt': new Date('12/23/2013'),
 	 "price": 5},
    {'name': 'Christmas special',
     'description': 'Коледа',
     "imageUrl": "img/soaps/soap2.jpg",
 	 'createdAt': new Date('11/24/2013'),
 	 "price": 8},
    {'name': 'Classic',
     'description': 'Класически модели сапуни',
     "imageUrl": "img/soaps/soap2.jpg",
 	 'createdAt': new Date('07/08/2014'),
 	 "price": 1},
    {'name': 'Classic',
     'description': 'Класически модели сапуни',
     "imageUrl": "img/soaps/soap2.jpg",
 	 'createdAt': new Date('07/08/2014'),
 	 "price": 1},
    {'name': 'Classic',
     'description': 'Класически модели сапуни',
     "imageUrl": "img/soaps/soap2.jpg",
 	 'createdAt': new Date('07/08/2014'),
 	 "price": 1},
    {'name': 'Classic',
     'description': 'Класически модели сапуни',
     "imageUrl": "img/soaps/soap2.jpg",
 	 'createdAt': new Date('07/08/2014'),
 	 "price": 1},
    {'name': 'Classic',
     'description': 'Класически модели сапуни',
     "imageUrl": "img/soaps/soap2.jpg",
 	 'createdAt': new Date('07/08/2014'),
 	 "price": 1}
  ];
});