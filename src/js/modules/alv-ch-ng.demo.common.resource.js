//TODO Testing
;(function () {
    'use strict';

    function ResourceModel(resourceName, title) {
        this.resourceName = resourceName;
        this.list = [];
        this.detail = undefined;
        this.view = {
            resourceBaseName: resourceName,
            templateUrl: '',
            deletionRequest: false,
            title: title,
            state: 'list'
        };
    }

    var module = angular.module('alv-ch-ng.demo.common.resource', [
        'ngRoute',
        'alv-ch-ng.i18n',
        'alv-ch-ng.demo.common.constants',
        'alv-ch-ng.demo.common.config',
        'alv-ch-ng.demo.common.messages'
    ]);

    module.factory('ResourceService', ['$http', 'I18nPropertyService', 'apiServerBasePath', 'defaultPollingTime', function ($http, I18nPropertyService, apiServerBasePath, defaultPollingTime) {
        Date.prototype.stdTimezoneOffset = function() {
            var jan = new Date(this.getFullYear(), 0, 1);
            var jul = new Date(this.getFullYear(), 6, 1);
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        };
        Date.prototype.dst = function() {
            return this.getTimezoneOffset() < this.stdTimezoneOffset();
        };

        var baseUrl = apiServerBasePath;
        var data = {};
        var polls = {};

        function decoratePromise(promise, success, error) {
            if (angular.isFunction(success)) {
                promise.success(success);
            }
            if (angular.isFunction(error)) {
                promise.error(error);
            }
        }

        function getAll(resourceName, success, error, refreshCache) {
            if (data[resourceName] && data[resourceName].list && !refreshCache) {
                success(data[resourceName].list);
            } else {
                decoratePromise($http.get(baseUrl + resourceName + 's'), function(result) {
                    if (!data[resourceName]) {
                        data[resourceName] = {
                            list: result
                        };
                    }
                    if (angular.isFunction(success)) {
                        success(result);
                    }

                }, error);
            }
        }

        function getByIdOrName(id, resourceName, success, error, refreshCache) {
            if (!id) {
                throw 'Param id must not be empty.';
            }

            if (data[resourceName] && data[resourceName].detail && data[resourceName].detailId && data[resourceName].detailId === id && !refreshCache) {
                success(data[resourceName].detail);
            } else {
                decoratePromise($http.get(baseUrl + resourceName + 's/' + id), function(result) {
                    if (!data[resourceName]) {
                        data[resourceName] = {};
                    }
                    data[resourceName].detail = result;
                    data[resourceName].detailId = id;
                    if (angular.isFunction(success)) {
                        success(result);
                    }
                }, error);
            }
        }

        function getFromUrl(url, success, error) {
            if (!url) {
                throw 'Param url must not be empty.';
            }
            decoratePromise($http.get(url), function(result) {
                if (angular.isFunction(success)) {
                    success(result);
                }
            }, error);
        }

        function find(searchParams, resourceName, success, error, refreshCache) {
            if (!searchParams) {
                throw 'Param searchParams must not be empty.';
            }
            var paramsString = '';
            if (searchParams) {
                for (var param in searchParams) {
                    if (paramsString.length > 0) {
                        paramsString = paramsString + '&';
                    }
                    paramsString = paramsString + param + '=' + searchParams[param];
                }
                if (paramsString.length > 0) {
                    paramsString = '?' + paramsString;
                }
            }

            if (data[resourceName] && data[resourceName].search && data[resourceName].search.paramString === paramsString && !refreshCache) {
                success(data[resourceName].search.result);
            } else {
                decoratePromise($http.get(baseUrl + resourceName + 's' + paramsString), function(result) {
                    if (!data[resourceName]) {
                        data[resourceName] = {};
                    }
                    data[resourceName].search = {
                        result: result,
                        paramString: paramsString
                    };
                    if (angular.isFunction(success)) {
                        success(result);
                    }
                }, error);
            }
            decoratePromise($http.get(baseUrl + resourceName + 's' + paramsString), success, error);
        }

        function remove(id, resourceName, success, error) {
            if (!id) {
                throw 'Param id must not be empty.';
            }
            return decoratePromise($http.delete(baseUrl + resourceName + 's/' + id), success, error);
        }

        function persist(item, resourceName, success, error) {
            if (!item) {
                throw 'Param item must not be empty.';
            }
            decoratePromise($http.post(baseUrl + resourceName + 's', item), success, error);
        }

        function startPolling(name, success, error) {
            // Check to make sure poller doesn't already exist
            if (!polls[name]) {
                polls[name] = setInterval(function () {
                    getAll(name, success, error);
                }, defaultPollingTime);
            }
        }

        function stopPolling(name) {
            clearInterval(polls[name]);
            delete polls[name];
        }

        return {
            'data': data,
            'getAll': getAll,
            'getByIdOrName': getByIdOrName,
            'getFromUrl': getFromUrl,
            'find': find,
            'delete': remove,
            'persist': persist,
            'startPolling': startPolling,
            'stopPolling': stopPolling
        };
    }]);

    module.directive('siResource', ['$location', '$routeParams', 'ResourceService', 'I18nPropertyService', 'MessageService', 'apiServerBasePath', function ($location, $routeParams, ResourceService, I18nPropertyService, MessageService) {

        function executeIfFunction(fn, param) {
            if (fn && angular.isFunction(fn)) {
                if (param) {
                    fn(param);
                } else {
                    fn();
                }
            }
        }

        return {
            restrict: 'A',
            templateUrl: '/pages/directiveTemplates/resource/dynamic-resource-page.html',
            replace: false,
            transclude: true,
            scope: true,
            link: function (scope, element, attrs) {

                // initialise variables
                var SEVERITY_ERROR = 'danger';
                var SEVERITY_SUCCESS = 'success';
                var resourceName = attrs.siResource || '';
                scope.resourceName = resourceName;
                var routeParamsIdAttribute = resourceName + 'Id';
                var templatePath = attrs.templatePath || '';
                var namingProperty = attrs.namingProperty;
                var idProperty = attrs.idProperty || namingProperty;
                var isNamingPropertyI18n = attrs.i18n;
                var id = $routeParams[routeParamsIdAttribute];
                scope.hideDetailViewLinks = attrs.hideDetailViewLinks || false;
                // link scope.data with the matching (resourceName dependent) context

                scope.data = new ResourceModel(resourceName, I18nPropertyService.resolveSimpleProperty(resourceName + 's'));

                if (isNamingPropertyI18n) {
                    namingProperty = namingProperty + '_' + I18nPropertyService.getCurrentLanguage();
                    scope.$on('i18n:languageChanged', function () {
                        namingProperty = attrs.namingProperty + '_' + I18nPropertyService.getCurrentLanguage();
                    });
                }

                function computeTitle(resource) {
                    var state = scope.data.view.state;
                    var msgProperties = {resourceName: I18nPropertyService.resolveSimpleProperty(resourceName)};
                    if (resource) {
                        msgProperties = {resourceName: I18nPropertyService.resolveSimpleProperty(resourceName), resourceTitle: resource[namingProperty]};
                    }
                    switch (state) {
                        case 'create':
                            return I18nPropertyService.resolveParameterizedProperty('common.resource.create', msgProperties);
                        case 'read':
                            return I18nPropertyService.resolveParameterizedProperty('common.resource.detail', msgProperties);
                        case 'edit':
                            return I18nPropertyService.resolveParameterizedProperty('common.resource.edit', msgProperties);
                        case 'list':
                            return I18nPropertyService.resolveSimpleProperty(resourceName + 's');
                        default:
                            return '';
                    }
                }

                function prepareListView() {
                    // fetch data from api
                    ResourceService.getAll(resourceName, function () {
                        scope.data.list = ResourceService.data[resourceName].list;
                        scope.pageReady = true;
                    }, null, false);
                    // set the view state & title
                    scope.data.view.state = 'list';
                    scope.data.view.title = computeTitle();
                    scope.$on('i18n:languageChanged', function () {
                        scope.data.view.title = computeTitle();
                    });
                }

                function prepareCreateView() {
                    scope.data.detail = {
                        'id': '',
                        'version': 0
                    };
                    scope.data.view.state = 'create';
                    scope.data.view.title = computeTitle();
                    scope.pageReady = true;
                    scope.$on('i18n:languageChanged', function () {
                        scope.data.view.title = computeTitle();
                    });
                }

                function prepareEditView(resource) {
                    scope.data.copy = ResourceService.data[resourceName].detail;
                    scope.data.view.state = 'edit';
                    scope.data.view.title = computeTitle(resource);
                    scope.pageReady = true;
                    scope.$on('i18n:languageChanged', function () {
                        scope.data.view.title = computeTitle(resource);
                    });
                }

                function prepareDetailView(resource) {
                    scope.data.view.state = 'read';
                    scope.data.view.title = computeTitle(resource);
                    scope.pageReady = true;
                    scope.$on('i18n:languageChanged', function () {
                        scope.data.view.title = computeTitle(resource);
                    });
                }

                if (!id) {
                    prepareListView();
                } else {
                    if (id === 'new') {
                        prepareCreateView();
                    } else {
                        var refresh =  false;
                        ResourceService.getByIdOrName(id, resourceName, function (result) {
                            scope.data.detail = result;
                            if ($routeParams.action !== 'edit') {
                                prepareDetailView(result);
                            } else {
                                prepareEditView(result);
                            }
                        }, null, refresh);

                    }
                }

                // returns the template path related to the current state
                scope.getViewTemplate = function () {

                    function computePrefix() {
                        return templatePath + '/' + resourceName + 's-';
                    }

                    if (scope.data.view.state === 'list') {
                        return computePrefix() + 'list.html';
                    }
                    if (scope.data.view.state === 'read') {
                        return computePrefix() + 'readonly.html';
                    }
                    if (scope.data.view.state === 'create' || scope.data.view.state === 'edit') {
                        return computePrefix() + 'form.html';
                    }
                    return '';
                };

                // Init creation of a resource by navigation to the corresponding uri. if another resource is
                // selected at the moment of the fn-call, it's no longer the detail one.
                scope.createNew = function () {

                    delete ResourceService.data[resourceName].detail;
                    $location.path('/' + resourceName + 's/new');
                };

                // Show a detail with this fn.
                scope.selectDetail = function (systemName) {
                    $location.path('/' + resourceName + 's/' + systemName);
                };

                // Edit the current item
                scope.editCurrent = function () {
                    $location.path('/' + resourceName + 's/' + scope.data.detail[idProperty] + '/edit');
                };

                // sends the current detail resource to the api server. a new one will be created, if
                // there an empty id attribute.
                scope.persistCurrent = function () {
                    MessageService.clearData();
                    executeIfFunction(scope.onPrePersist, scope.data.detail);
                    if (scope.data.detail.links) {
                        for (var i = 0; i < scope.data.detail.links.length; i++) {
                            var link = scope.data.detail.links[i];
                            if (link.rel === 'self') {
                                var tokens = link.href.split('/');
                                scope.data.detail.id = tokens[tokens.length - 1];
                            }
                        }
                    }
                    var isNew = scope.data.detail.uuid ? false : true;
                    delete scope.data.detail.links;
                    delete scope.data.detail.uuid;
                    var i18nResourceName = I18nPropertyService.resolveSimpleProperty(resourceName);
                    ResourceService.persist(scope.data.detail, resourceName, function (response) {
                        executeIfFunction(scope.onPostPersist, scope.data.detail);
                        var textKey = isNew ? 'common.alert.resource.create.success' : 'common.alert.resource.update.success';
                        var text = I18nPropertyService.resolveParameterizedProperty(textKey, {resourceName: i18nResourceName});
                        MessageService.addMessage({severity: SEVERITY_SUCCESS, text: text}, scope.resourceName);
                        $location.path(resourceName + 's/' + response[namingProperty]);
                    }, function () {
                        var textKey = isNew ? 'common.alert.resource.create.error' : 'common.alert.resource.update.error';
                        var text = I18nPropertyService.resolveParameterizedProperty(textKey, {resourceName: i18nResourceName});
                        MessageService.addMessage({severity: SEVERITY_ERROR, text: text}, scope.resourceName);
                    });
                };

                // Delete the current resource.
                scope.deleteCurrent = function () {
                    MessageService.clearData();
                    executeIfFunction(scope.onPreDelete, scope.data.detail);
                    if (scope.data.detail) {
                        var i18nResourceName = I18nPropertyService.resolveSimpleProperty(resourceName);
                        ResourceService.delete(scope.data.detail.uuid, resourceName, function () {
                            executeIfFunction(scope.onPostDelete, scope.data.detail);
                            var textKey = 'common.alert.resource.delete.success';
                            var text = I18nPropertyService.resolveParameterizedProperty(textKey, {resourceName: i18nResourceName});
                            MessageService.addMessage({severity: SEVERITY_SUCCESS, text: text}, scope.resourceName);
                        }, function () {
                            var textKey = 'common.alert.resource.delete.error';
                            var text = I18nPropertyService.resolveParameterizedProperty(textKey, {resourceName: i18nResourceName});
                            MessageService.addMessage({severity: SEVERITY_ERROR, text: text}, scope.resourceName);
                        });
                        delete ResourceService.data[resourceName].detail;
                        delete ResourceService.data[resourceName].all;
                        $location.path('/' + resourceName + 's');
                    }
                };

                //
                scope.toggleDeletionRequest = function () {
                    scope.data.view.deletionRequest = !scope.data.view.deletionRequest;
                };

                scope.cancel = function () {
                    if (scope.data.view.state === 'create') {
                        delete ResourceService.data[resourceName].detail;
                        $location.path('/' + resourceName + 's');
                    } else {
                        if (ResourceService.data[resourceName].copy) {
                            ResourceService.data[resourceName].detail = ResourceService.data[resourceName].copy;
                        }
                        $location.path('/' + resourceName + 's' + '/' + ResourceService.data[resourceName].detail[namingProperty]);
                    }
                };

                scope.$on('$routeChangeStart', function() {
                    scope.pageReady = false;
                });
            }
        };
    }]);



}());
