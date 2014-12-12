;(function() {

    'use strict';

    /**
     * Initially required dependencies.
     * @type {string[]}
     */
    var dependencies = [
        'ngRoute',
        'ngCookies',
        'alv-ch-ng.ui-core',
        'alv-ch-ng.ui-forms',
        'alv-ch-ng.ui-scroll',
        'alv-ch-ng.demo.common.resource',
        'alv-ch-ng.demo.common.i18n',
        'alv-ch-ng.demo.common.messages',
        'alv-ch-ng.demo.common.ui',
        'alv-ch-ng.demo.common.constants',
        'alv-ch-ng.demo.common.config',
        'ng-dev'
    ];

    /**
     * The sysInfos admin application.
     */
    var app = angular.module('alv-ch-ng.demo', dependencies);

    /**
     * xSite request & routing definitions
     */
    app.config(function ($routeProvider, $httpProvider) {
        /** Enable cross domain communication **/
        $httpProvider.defaults.headers.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        /** -- Routings -- **/
        var routes = [
            { path: '/', templateUrl: '/pages/common/welcome.html'},
            { path: '/getting_started', templateUrl: '/pages/info/getting_started.html'},
            { path: '/less', templateUrl: '/pages/info/less.html'},
            { path: '/angular', templateUrl: '/pages/info/ng.html'},
            { path: '/components', templateUrl: '/pages/info/components.html'}
        ];

        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];

            if (route.redirectTo) {
                $routeProvider.when(route.path, { redirectTo: route.redirectTo });
            }  else if (route.controller) {
                $routeProvider.when(route.path, {
                    templateUrl: route.templateUrl,
                    controller: route.controller
                });
            } else {
                $routeProvider.when(route.path, {
                    templateUrl: route.templateUrl
                });
            }
        }

        /** 404 **/
        $routeProvider.otherwise({templateUrl: '/pages/common/404.html'});
    });

    /**
     * Fetch all systems and keep them in the rootScope. A rootScope update my be triggered periodically to refresh systems' states.
     */
    app.run(function ($rootScope, ResourceService, I18nPropertyService, languages) {
        $rootScope.allSystems = [];
        $rootScope.systemsReady = false;
        $rootScope.languages = languages;
        ResourceService.getAll('system', function (result) {
            result.content.sort(function(a, b) {
                var attr = 'name_' + I18nPropertyService.getCurrentLanguage();
                if (a[attr] < b[attr]){
                    return -1;
                }
                if (a[attr] > b[attr]){
                    return 1;
                }
                return 0;
            });
            $rootScope.allSystems = result.content;
            $rootScope.systemsReady = true;
            $rootScope.$broadcast('event:allSystemsUpdated');
/*            ResourceService.startPolling('system', function(result) {
                $rootScope.allSystems = result.content;
                $rootScope.$broadcast('event:allSystemsUpdated', $rootScope.allSystems);
            });*/
        });
    });
}());