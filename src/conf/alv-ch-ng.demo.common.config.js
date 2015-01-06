;(function () {
    'use strict';

    var module = angular.module('alv-ch-ng.demo.common.config', []);

    module.constant('applicationVersion', 'v1.0.0 - demo site for github/alv-ch/alv-ch-ng');
    module.constant('applicationReleaseNote', 'poc');
    module.constant('apiServerBasePath', 'http://localhost:8080/api/');
    module.constant('defaultPollingTime', 200000);

}());