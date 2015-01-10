;(function () {
    'use strict';

    var module = angular.module('alv-ch-ng.demo.common.constants', []);

    module.constant('applicationVersion', 'alv-ch-ng v0.1.1 - Demo Application for alv-ch/alv-ch-ng');
    module.constant('applicationReleaseNote', 'poc');
    module.constant('apiServerBasePath', 'http://localhost:8080/api/');

    module.constant('supportedLanguages', ['de', 'en']);
    module.constant('defaultLanguage', 'de');
    module.constant('defaultPollingTime', 200000);
    module.constant('systemStateToCssClassMap', {
        'OPERATIONAL': 'success',
        'DEGRADED_PERFORMANCE': 'warning',
        'PARTIAL_OUTAGE': 'warning',
        'MAJOR_OUTAGE': 'danger'
    });
    module.constant('languages', [
        { name: 'Deutsch', nameKey: 'common.language.de', code: 'GERMAN', abbr: 'de' },
        { name: 'English', nameKey: 'common.language.en', code: 'ENGLISH', abbr: 'en' }
    ]);
    module.constant('reservedTemplateParams', [
        'validFrom',
        'severity',
        'validTo',
        'subject',
        'system',
        'type'
    ]);
    module.constant('hours', ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30',
        '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30']);
    module.constant('types', [
        {name: 'common.choose', value: 'default'},
        {name: 'messages.type.maintenance_window', value: 'MAINTENANCE_WINDOW'},
        {name: 'messages.type.incident', value: 'INCIDENT'}
    ]);
    module.constant('severities', [
        {name: 'common.choose', value: 'default'},
        {name: 'common.severity.degraded_performance', value: 'DEGRADED_PERFORMANCE'},
        {name: 'common.severity.partial_outage', value: 'PARTIAL_OUTAGE'},
        {name: 'common.severity.major_outage', value: 'MAJOR_OUTAGE'}
    ]);
}());