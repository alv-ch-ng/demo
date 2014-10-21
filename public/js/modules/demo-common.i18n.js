define(['angular'], function () {

    var module = angular.module('demo-common.i18n', []);

    module.factory('I18nService', ['$window', function localizeRequest($window) {

        function getLanguageFromAgent() {
            if (($window.navigator.userLanguage != 'de' || $window.navigator.language != 'de')
                && ($window.navigator.userLanguage != 'fr' || $window.navigator.language != 'fr')
                && ($window.navigator.userLanguage != 'it' || $window.navigator.language != 'it'))
            {
                return 'de';
            }
            return $window.navigator.userLanguage || $window.navigator.language;
        }

        return {
            getLanguageFromAgent: getLanguageFromAgent
        };

    }]);
});