;(function () {
    'use strict';

    var module = angular.module('alv-ch-ng.demo.common.messages', []);

    module.factory('MessageService', function() {
        var data = {
            global: []
        };
        function addMessage(message, removeOthers, scope) {
            if (message) {
                if (scope) {
                    if (!data[scope]) {
                        data[scope] = [];
                    }
                    if (removeOthers) {
                        clearData(scope);
                    }
                    data[scope].unshift(message);
                } else {
                    if (removeOthers) {
                        clearData();
                    }
                    data.global.unshift(message);
                }
            }
        }

        function removeMessage(index, scope) {
            if (index < 0) {
                return;
            }
            var scopedData = data.global;
            if (scope) {
                scopedData = data[scope];
            }
            if (scopedData && index < scopedData.length) {
                scopedData.splice(index, 1);
            }
        }

        function clearData(scope) {
            if (scope) {
                data[scope].length = 0;
            } else {
                data.global.length = 0;
            }
        }

        return {
            data: data,
            addMessage: addMessage,
            removeMessage: removeMessage,
            clearData: clearData
        };
    });

    module.directive('messages', ['MessageService', function(MessageService){
        return {
            priority: 10,
            restrict: 'E',
            template: '<div class="system-messages">' +
                            '<message message-severity="{{message.severity}}" message-dismissable="true" id="message{{$index}}" ng-repeat="message in messages">' +
                                '<span ng-bind="message.text"></span>' +
                            '</message>' +
                      '</div>',
            replace: true,
            scope: {
                'messageScope': '='
            },
            link: function(scope){
                scope.$watch('messageScope', function() {
                    scope.messages = MessageService.data[scope.messageScope];
                });

                scope.removeMessage = function(index, scope) {
                    MessageService.removeMessage(index, scope);
                };
            }
        };
    }]);

}());