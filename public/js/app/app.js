'use strict'

/* Application module */
var hopeSoap = angular.module('hopeSoap', ['hopeSoapControllers']);

/* Initialisation directive, will fire even initialised you can listen to */
hopeSoap.directive('initialisation',
    ['$rootScope',
        function($rootScope) {
            return {
                restrict: 'A',
                link: function($scope) {
                    var to;
                    var listener = $scope.$watch(function() {
                        clearTimeout(to);
                        to = setTimeout(function () {
                            console.log('initialised');
                            listener();
                            $rootScope.$broadcast('initialised');
                        }, 50);
                    });
                }
            };
        }]);
