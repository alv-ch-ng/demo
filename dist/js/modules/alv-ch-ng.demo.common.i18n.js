;(function () {
    'use strict';
    var module = angular.module('alv-ch-ng.demo.common.i18n', [
        'ngCookies',
        'alv-ch-ng.demo.common.constants',
        'alv-ch-ng.i18n'
    ]);

    module.config(function(I18nPropertyServiceProvider, supportedLanguages, defaultLanguage) {
        I18nPropertyServiceProvider.setFilePath('/i18n/');
        I18nPropertyServiceProvider.setDefaultLanguage(defaultLanguage);
        I18nPropertyServiceProvider.setSupportedLanguages(supportedLanguages);
        I18nPropertyServiceProvider.setMarkUnresolvedProperties(true);
    });

    module.run(function($rootScope, $cookies, $window, I18nPropertyService, supportedLanguages) {

        function getLanguageFromAgent() {
            var agentLanguage = (navigator.userLanguage || navigator.language).substring(0,2);
            if (!supportedLanguages.indexOf(agentLanguage)){
                return 'de';
            }
            return agentLanguage;
        }

        function setLanguageCookie(language) {
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000*60*60*24*365;//1000ms*60sek*60min*24h==1day * 365 = 1year
            now.setTime(expireTime);
            document.cookie = 'language=' + language + ';expires=' + now.toGMTString() + ';path=/';
        }

        if ($cookies.language) {
            I18nPropertyService.setCurrentLanguage($cookies.language);
        } else {
            var language = getLanguageFromAgent();
            setLanguageCookie(language);
            I18nPropertyService.setCurrentLanguage(language);
        }

        $rootScope.$on('i18n:languageChanged', function() {
            setLanguageCookie(I18nPropertyService.getCurrentLanguage());
        });
    });

    module.controller('LanguageCtrl', function($scope, I18nPropertyService, supportedLanguages) {
        $scope.supportedLanguages = supportedLanguages;
        $scope.currentLanguage = I18nPropertyService.resolveSimpleProperty('common.language.' + I18nPropertyService.getCurrentLanguage());
        $scope.$on('i18n:languageChanged', function() {
            $scope.currentLanguage = I18nPropertyService.resolveSimpleProperty('common.language.' + I18nPropertyService.getCurrentLanguage());
        });
    });

}());