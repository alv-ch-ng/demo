;(function () {
    'use strict';

    var module = angular.module('alv-ch-ng.demo.common.config', []);

    module.constant('applicationVersion', '1.0.0.');
    module.constant('applicationReleaseNote', 'poc');
    module.constant('apiServerBasePath', 'http://localhost:8080/api/');
    module.constant('defaultPollingTime', 200000);

}());