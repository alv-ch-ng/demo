;(function () {
    'use strict';
    function isIE() {
        var userAgent = window.navigator.userAgent;
        var msIE = userAgent.indexOf('MSIE ');
        if (msIE > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
            return true;
        }
        return false;
    }

    var module = angular.module('alv-ch-ng.demo.common.ui', [
        'ngSanitize',
        'alv-ch-ng.i18n',
        'alv-ch-ng.demo.common.resource',
        'alv-ch-ng.demo.common.constants'
    ]);

    module.config(function (UiConfigServiceProvider) {
        UiConfigServiceProvider.setConfig({
            labelWidth: 3,
            commonSubmit: 'Submit',
            commonCancel: 'Cancel',
            titleSelect: 'testPleaseChoose',
            gridDefaultDevice: 'md'
        });
    });

    module.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) {
                return '';
            }
            max = parseInt(max, 10);
            if (!max) {
                return value;
            }
            if (value.length <= max) {
                return value;
            }
            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    });

    module.filter('siI18nPropertyCut', function (I18nPropertyService) {
        return function (value, attribute, max, tail) {
            var language = I18nPropertyService.getCurrentLanguage();
            value = value[attribute + '_' + language];
            max = parseInt(max, 10);
            if (!max) {
                return value;
            }
            if (value.length <= max) {
                return value;
            }
            value = value.substr(0, max);
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                value = value.substr(0, lastspace);
            }
            return value + (tail || ' …');
        };
    });

    module.filter('i18nMessageCut', function (I18nPropertyService) {
        return function (value, max, tail) {
            if (!value) {
                return '';
            }
            value = I18nPropertyService.resolveSimpleProperty(value);
            if (!value) {
                return '';
            }
            max = parseInt(max, 10);
            if (!max) {
                return value;
            }
            if (value.length <= max) {
                return value;
            }
            value = value.substr(0, max);
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                value = value.substr(0, lastspace);
            }
            return value + (tail || ' …');
        };
    });

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

    //replaces the given jackson-date string with a javascript date in the format dd.mm.yyyy directly into the tag
    module.directive('siDate', function () {
        return {
            restrict: 'A',
            scope: {
                siDate: '='
            },
            link: function (scope, element) {
                scope.$watch('siDate', function () {
                    var value = '', date;
                    if (scope.siDate) {
                        if(isIE()){
                            date = new Date(scope.siDateTime.replace(/\-/ig, '/').split('.')[0]);
                        } else {
                            date = new Date(scope.siDateTime);
                        }
                        var days = date.getUTCDate();
                        var months = (Number(date.getUTCMonth()) + 1);
                        if(days < 10){
                            days = '0' + days;
                        }
                        if(months < 10){
                            months = '0' + months;
                        }
                        value = days + '.' + months + '.' + date.getUTCFullYear();
                    }
                    element.html(value);
                });

            }
        };
    });
    //replaces the given jackson-date string with a javascript date in the format dd.mm.yyyy hh:MM directly into the tag
    module.directive('siDateTime', function () {
        return {
            restrict: 'A',
            scope: {
                siDateTime: '='
            },
            link: function (scope, element) {
                scope.$watch('siDateTime', function () {
                    var value = '', date;
                    if (scope.siDateTime) {
                        if(isIE()){
                            date = new Date(scope.siDateTime.replace(/\-/ig, '/').split('.')[0]);
                        } else {
                            date = new Date(scope.siDateTime);
                        }
                        var days = date.getUTCDate();
                        var months = (Number(date.getUTCMonth()) + 1);
                        var hours = date.getUTCHours();
                        var minutes = date.getUTCMinutes();
                        if(days < 10){
                            days = '0' + days;
                        }
                        if(months < 10){
                            months = '0' + months;
                        }
                        if(hours < 10){
                            hours = '0' + hours;
                        }
                        if(minutes < 10){
                            minutes = '0' + minutes;
                        }
                        value = days + '.' + months + '.' + date.getUTCFullYear() + ' ' + hours + ':' + minutes;
                    }
                    element.html(value);
                });
            }
        };
    });
    //replaces the given jackson-date string with a javascript date in the format hh:MM directly into the tag
    module.directive('siTime', function () {
        return {
            restrict: 'A',
            scope: {
                siTime: '='
            },
            link: function (scope, element) {
                scope.$watch('siTime', function () {
                    var value = '', date;
                    if (scope.siTime) {
                        if(isIE()){
                            date = new Date(scope.siDateTime.replace(/\-/ig, '/').split('.')[0]);
                        } else {
                            date = new Date(scope.siDateTime);
                        }
                        var hours = date.getUTCHours();
                        var minutes = date.getUTCMinutes();
                        if(hours < 10){
                            hours = '0' + hours;
                        }
                        if(minutes < 10){
                            minutes = '0' + minutes;
                        }
                        value = hours + ':' + minutes;
                    }
                    element.html(value);
                });

            }
        };
    });

    module.directive('siProperty', function () {
        return {
            restrict: 'E',
            templateUrl: '/pages/directiveTemplates/commonLayout/sysinfos-property.html',
            replace: true,
            scope: true,
            link: function (scope, element, attrs) {
                scope.id = attrs.id || '' + Math.random() * 10000000000000000;
                scope.value = scope.$eval(attrs.propertyValue) || '';
                scope.label = attrs.propertyLabel;
                scope.$watch(attrs.propertyValue, function () {
                    scope.value = scope.$eval(attrs.propertyValue) || '';
                });
            }
        };
    });

    module.directive('siI18nProperty', function (I18nPropertyService) {
        return {
            priority: 10,
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs) {
                scope.$watch(attrs.siI18nProperty + '_' + I18nPropertyService.getCurrentLanguage(), function () {
                    var value = scope.$eval(attrs.siI18nProperty + '_' + I18nPropertyService.getCurrentLanguage()) || '';
                    element.html(value);
                });
                scope.$on('i18n:languageChanged', function () {
                    var value = scope.$eval(attrs.siI18nProperty + '_' + I18nPropertyService.getCurrentLanguage()) || '';
                    element.html(value);
                });
            }
        };
    });

    module.directive('siNavbar', ['I18nPropertyService', 'supportedLanguages', function (I18nPropertyService, supportedLanguages) {
        var map = {
            de: 'GERMAN',
            fr: 'FRENCH',
            it: 'ITALIAN',
            en: 'ENGLISH'
        };

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/pages/directiveTemplates/commonLayout/sysinfos-navbar.html',
            scope: true,
            link: function (scope) {
                scope.languages = [];

                for (var i = 0; i < supportedLanguages.length; i++) {
                    scope.languages.push({name: I18nPropertyService.resolveSimpleProperty('common.language.' + supportedLanguages[i]), code: map[supportedLanguages[i]]});
                }

            }
        };
    }]);

    module.directive('siPartial', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: true,
            templateUrl: '/pages/directiveTemplates/commonLayout/sysinfos-partial.html',
            link: function (scope, element, attrs) {
                scope.partial = {
                    id: attrs.id,
                    text: attrs.text,
                    title: attrs.title
                };
            }
        };
    });

    module.directive('siPage', function () {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            templateUrl: '/pages/directiveTemplates/commonLayout/sysinfos-page.html',
            link: function (scope, element, attrs) {
                scope.pageReady = attrs.siPage;
                scope.$watch(attrs.siPage, function () {
                    scope.pageReady = attrs.siPage;
                });
            }
        };
    });

    module.directive('siPageHeader', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/pages/directiveTemplates/commonLayout/sysinfos-page-header.html'
        };
    });

    module.directive('siPageBody', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div class="si-page-body row" ng-transclude><div></div></div>'
        };
    });

    module.directive('siFooter', function () {
        return {
            restrict: 'E',
            templateUrl: '/pages/directiveTemplates/commonLayout/sysinfos-footer.html'
        };
    });

    module.directive('siReleaseNote', ['applicationVersion', 'applicationReleaseNote', function (applicationVersion, applicationReleaseNote) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/pages/directiveTemplates/commonLayout/sysinfos-release-note.html',
            link: function (scope) {
                scope.applicationVersion = applicationVersion;
                scope.applicationReleaseNote = applicationReleaseNote;
            }
        };
    }]);

    module.directive('systemsList', ['$rootScope', '$location', 'I18nPropertyService', function ($rootScope, $location, I18nPropertyService) {
        function updateCheckedFlags(scope) {
            if ($rootScope.systemsReady) {
                scope.systems = angular.copy($rootScope.allSystems);
                if (scope.targetList && scope.targetList.length > 0) {
                    for (var i = 0; i < scope.systems.length; i++) {
                        if (scope.targetList.indexOf(scope.systems[i].links[0])) {
                            scope.systems[i].checked = true;
                        }
                    }
                }
            }
        }
        return {
            restrict: 'E',
            replace: false,
            templateUrl: '/pages/directiveTemplates/system/systems-list.html',
            scope: {
                'formShow': '=',
                'subscription': '='
            },
            link: function (scope) {
                scope.systems = angular.copy($rootScope.allSystems);
                scope.listReady = false;
                scope.$on('event:allSystemsUpdated', function () {
                    scope.systems = angular.copy($rootScope.allSystems);
                    updateCheckedFlags(scope);
                    scope.listReady = true;
                }, true);

                scope.$watch(scope.subscription, function () {
                    scope.systems = angular.copy($rootScope.allSystems);
                    updateCheckedFlags(scope);
                    scope.listReady = true;
                }, true);

                scope.selectSystem = function (system, index) {
                    if (scope.formShow && scope.subscription) {
                        if (scope.systems[index]) {
                            scope.systems[index].checked = !scope.systems[index].checked;
                        }
                        if (scope.subscription) {
                            if (system.checked) {
                                if (scope.subscription.systems.indexOf(system.links[0]) < 0) {
                                    scope.subscription.systems.push(system.links[0]);
                                }
                            } else {
                                scope.subscription.systems.splice(scope.subscription.systems.indexOf(system.links[0]), 1);
                            }
                        }
                    } else {
                        if(system['name_' + I18nPropertyService.getCurrentLanguage()].match(/[àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÖÔŒÙÛÜŸÇ]/)){
                            $location.path('/systems/' + system.uuid);
                        } else {
                            $location.path('/systems/' + system['name_' + I18nPropertyService.getCurrentLanguage()]);
                        }
                    }
                };
            }
        };
    }]);

    module.directive('systemsSelectionList', ['$rootScope', '$location', '$anchorScroll', 'I18nPropertyService', function ($rootScope, $location, $anchorScroll, I18nPropertyService) {
        function updateCheckedFlags(scope) {
            if ($rootScope.systemsReady) {
                scope.systems = angular.copy($rootScope.allSystems);
                if (scope.targetList && scope.targetList.length > 0) {
                    var links = [];

                    for (var i = 0; i < scope.targetList.length; i++) {
                        links.push(scope.targetList[i].href);
                    }
                    for (var j = 0; j < scope.systems.length; j++) {
                        if (links.indexOf(scope.systems[j].links[0].href) !== -1) {
                            scope.systems[j].checked = true;
                        } else {
                            scope.systems[j].checked = false;
                        }
                    }
                }
            }
        }
        function setModel(scope) {
            scope.listReady = false;
            scope.systems = angular.copy($rootScope.allSystems);
            updateCheckedFlags(scope);
            scope.listReady = true;
        }
        return {
            restrict: 'E',
            replace: false,
            templateUrl: '/pages/directiveTemplates/system/systems-selection-list.html',
            scope: {
                'formShow': '=',
                'subscription': '=',
                'targetList': '='
            },
            link: function (scope) {
                scope.systems = angular.copy($rootScope.allSystems);
                scope.$on('event:allSystemsUpdated', function () {
                    setModel(scope);
                });
                scope.$watch('subscription', function () {
                    setModel(scope);
                }, true);
                scope.selectSystem = function (system) {
                    if (scope.formShow) {
                        system.checked = !system.checked;
                        var idx =  -1;
                        for (var i = 0; i < scope.subscription.systems.length; i++) {
                            if (scope.subscription.systems[i].href === system.links[0].href) {
                                idx = i;
                            }
                        }
                        if (system.checked) {
                            if (idx === -1) {
                                scope.subscription.systems.push(system.links[0]);
                            }
                        } else {
                            if (idx > -1) {
                                scope.subscription.systems.splice(idx, 1);
                            }

                        }
                    } else {
                        if(system['name_' + I18nPropertyService.getCurrentLanguage()].match(/[àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÖÔŒÙÛÜŸÇ]/)){
                            $location.path('/systems/' + system.uuid);
                        } else {
                            $location.path('/systems/' + system['name_' + I18nPropertyService.getCurrentLanguage()]);
                        }
                    }
                };
            }
        };
    }]);

    module.directive('siState', ['I18nPropertyService', function (I18nPropertyService) {
        function setContent(scope, element) {
            if (scope.siState) {
                scope.siState = scope.siState.toLowerCase();
                element.html(I18nPropertyService.resolveSimpleProperty('common.severity.' + scope.siState));
                element.addClass(scope.siState);
                element.addClass('si-state');
            }
        }
        return {
            priority: 2,
            restrict: 'A',
            scope: {
                siState: '='
            },
            link: function (scope, element) {
                setContent(scope, element);
                scope.$watch('siState', function() {
                    setContent(scope, element);
                });
                scope.$on('i18n:languageChanged', function () {
                    setContent(scope, element);
                });
            }
        };
    }]);

    module.directive('siStateGlyph', function () {
        /*jshint camelcase: false */
        var map = {
            operational: 'ok',
            degraded_performance: 'warning-sign',
            partial_outage: 'warning-sign',
            major_outage: 'remove'
        };
        function setGlyph(element, map, scope) {
            if (scope.siStateGlyph && map[scope.siStateGlyph]) {
                element.attr('class', 'state-glyph glyphicon glyphicon-' + map[scope.siStateGlyph]);
            } else {
                element.attr('class', 'state-glyph glyphicon glyphicon-question-sign');
            }
        }
        return {
            restrict: 'A',
            scope: {
                siStateGlyph: '='
            },
            link: function (scope, element) {
                setGlyph(element, map, scope);
                scope.$watch('siStateGlyph', function() {
                    setGlyph(element, map, scope);
                });
            }
        };
    });

    //Loops over the given JSON-Object array and creates a detail-view of the messages for each object
    module.directive('siSystemMessages', ['ResourceService', function (ResourceService) {
        function fetchAndSetData(scope) {
            scope.listReady = false;
            if (scope.systemId === 'anySystem') {
                ResourceService.getAll('systemMessageList', function (result) {
                    scope.messages = result.content;
                    scope.listReady = true;
                }, null, true);
            } else if (scope.systemId) {
                ResourceService.getAll('systems/' + scope.systemId + '/message', function (result) {
                    scope.messages = result.content;
                    scope.listReady = true;
                }, null, true);
            }
        }

        return {
            restrict: 'AE',
            scope: {
                systemId: '=',
                selectable: '=',
                showSystemNames: '='
            },
            templateUrl: '/pages/directiveTemplates/system/system-messages-list.html',
            link: function (scope) {
                scope.messages = [];
                scope.listReady = false;
                fetchAndSetData(scope);

                scope.$watch('systemId', function () {
                    fetchAndSetData(scope);
                });
            }
        };
    }]);

    module.directive('siDatepicker', [function(){
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                select: '&',
                pickerOptions: '=',
                minDate: '='
            },
            link: function(scope, element, attrs, ngModel){
                if(!ngModel) {
                    return;
                }
                var optionsObj = {};
                optionsObj.dateFormat = 'dd.mm.yy';
                optionsObj.minDate = new Date();
                optionsObj.firstDay = 1;
                optionsObj.duration = 'normal';
                optionsObj.hideIfNoPrevNext = true;
                optionsObj.showAnim = 'slideDown';
                if(scope.minDate){
                    optionsObj.minDate = scope.minDate;
                }
                if(scope.pickerOptions){
                    jQuery.extend(true, optionsObj, scope.pickerOptions);
                }
                scope.$watch('minDate', function(){
                    if(scope.minDate){
                        var dates = scope.minDate.split('.');
                        optionsObj.minDate = new Date(Number(dates[2]), Number(dates[1]) - 1, Number(dates[0]));
                        element.datepicker('option', 'minDate', optionsObj.minDate);
                    }
                });
                var updateModel = function(dateText){
                    scope.$apply(function(){
                        ngModel.$setViewValue(dateText);
                    });
                };
                optionsObj.onSelect = function(dateTxt){
                    updateModel(dateTxt);
                    if(scope.select){
                        scope.$apply(function(){
                            scope.select({date: dateTxt});
                        });
                    }
                };
                ngModel.$render = function(){
                    if(element.datepicker){
                        element.datepicker('setDate', ngModel.$viewValue || '');
                    }
                };
                element.datepicker(optionsObj);
            }
        };
    }]);

    module.directive('checkRange', [function(){
        return {
            restrict: 'A',
            scope: {
                rangeFrom: '=',
                rangeTo: '='
            },
            link: function(scope, element){
                var startRange = angular.copy(scope.rangeFrom);
                var endRange = angular.copy(scope.rangeTo);
                console.log(startRange + ' - ' + endRange);
                var currentDate = new Date();
                if(currentDate.dst()){
                    currentDate.setUTCHours(Number(currentDate.getUTCHours() + 2));
                } else {
                    currentDate.setUTCHours(Number(currentDate.getUTCHours() + 1));
                }
                if(Date.parse(new Date(startRange).toUTCString()) - Date.parse(currentDate.toString()) >= 0){
                    element.hide();
                } else if(endRange){
                    if(Date.parse(currentDate.toString()) - Date.parse(new Date(endRange).toUTCString()) >= 0){
                        element.hide();
                    }
                }
            }
        };
    }]);
}());