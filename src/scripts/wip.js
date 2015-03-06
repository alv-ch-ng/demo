;(function(){

    'use strict';

    var module = angular.module('wip', []);

module.directive('activeStartswith', ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on('$routeChangeSuccess', function () {
                element.removeClass('active');
                var patterns = attrs.activeStartswith.split('|');
                for (var i = 0; i < patterns.length; i++) {
                    var pattern = patterns[i];
                    if ($location.path().indexOf(pattern) > -1) {
                        element.addClass('active');
                    }
                }
            });
        }
    };
}]);

module.directive('showStartswith', ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on('$routeChangeSuccess', function () {
                element.removeClass('active');
                var patterns = attrs.showStartswith.split('|');
                for (var i = 0; i < patterns.length; i++) {
                    var pattern = patterns[i];
                    if ($location.path().indexOf(pattern) > -1) {
                        element.removeClass('ng-hide');
                    }
                    else {
                        element.addClass('ng-hide');
                    }
                }
            });
        }
    };
}]);

module.directive('hideStartswith', ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$on('$routeChangeSuccess', function () {
                element.removeClass('active');
                var patterns = attrs.hideStartswith.split('|');
                for (var i = 0; i < patterns.length; i++) {
                    var pattern = patterns[i];
                    if ($location.path().indexOf(pattern) > -1) {
                        element.addClass('ng-hide');
                    }
                    else {
                        element.removeClass('ng-hide');
                    }
                }
            });
        }
    };
}]);

}());