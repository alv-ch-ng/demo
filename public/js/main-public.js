require.config({
    baseUrl: "/",

    // alias libraries paths.  Must set 'angular'
    paths: {

        'angularAMD':                   'lib/angular-amd/angularAMD.min',
        'angular':                      'lib/angular/angular.min',
        'angular-cookies':              'lib/angular/angular-cookies.min',
        'angular-route':                'lib/angular/angular-route.min',
        'angular-scroll':               'lib/angular/angular-scroll.min',
        'angular-ui-bindHtml':          'lib/angular-ui-bootstrap/bindHtml/bindHtml',
        'angular-ui-placeholders':      'lib/ng-placeholders/placeholders-0.0.3-SNAPSHOT',
        'angular-ui-position':          'lib/angular-ui-bootstrap/position/position',
        'angular-ui-tabs':              'lib/angular-ui-bootstrap/tabs/tabs',
        'angular-ui-tooltip':           'lib/angular-ui-bootstrap/tooltip/tooltip',
        'angular-ui-typeahead':         'lib/angular-ui-bootstrap/typeahead/typeahead',
        'bootstrap':                    'lib/bootstrap/js/bootstrap',
        'bootstrap-select':             'lib/bootstrap-select/js/bootstrap-select.min',
        'jQuery':                       'lib/jquery/jquery.min',
        'jquery':                       'lib/jquery/jquery.min',
        'jQuery.properties':            'lib/jquery/jquery.i18n.properties',
        'jQuery.ui.widget':             'lib/jquery-ui/ui/widget',
        'ngload':                       'lib/angular-amd/ngload.min',
        'ng-dev':                       'lib/ng-dev/ng-dev',
        'highlightjs':                  'lib/highlightjs/highlight.pack',
        'alv-ch-ng.common':             'lib/alv-ch-ng/alv-ch-ng.common.min',
        'alv-ch-ng.i18n':               'lib/alv-ch-ng/alv-ch-ng.i18n',
        'alv-ch-ng.ui-core':            'lib/alv-ch-ng/alv-ch-ng.ui-core',
        'alv-ch-ng.ui-forms':           'lib/alv-ch-ng/alv-ch-ng.ui-forms',
        'demo-common.i18n':             'js/modules/demo-common.i18n',
        'demo-common.constants':        'js/modules/demo-common.constants',
        'app':                          'js/application/application-public'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD':               [
                                        'angular'
                                    ],
        'angular':                  ['jQuery'],
        'angular-cookies':          ['angular'],
        'angular-route':            ['angular'],
        'angular-scroll':           ['angular'],
        'angular-ui-tabs':          ['angular'],
        'angular-ui-position':      ['angular'],
        'angular-ui-bindHtml':      ['angular'],
        'angular-ui-tooltip':       ['angular'],
        'angular-ui-typeahead':     [
                                        'angular',
                                        'angular-ui-position',
                                        'angular-ui-bindHtml'
                                    ],
        'angular-ui-placeholders':  ['angular'],
        'alv-ch-ng.ui-core':        ['angular'],
        'alv-ch-ng.ui-forms':       [
                                        'alv-ch-ng.ui-core',
                                        'angular',
                                        'angular-ui-tooltip',
                                        'angular-ui-typeahead',
                                        'jQuery.ui.widget'
                                    ],
        'alv-ch-ng.i18n':           [
                                        'angular',
                                        'jQuery.properties'
                                    ],
        'bootstrap':                ['jQuery'],
        'bootstrap-select':         [
                                        'bootstrap',
                                        'jQuery'
                                    ],
        'jQuery.properties':        ['jQuery'],
        'ng-dev':                   [
                                        'angular',
                                        'jQuery'
                                    ],
        'highlightjs':              [
                                        'jQuery'
                                    ],
        'app':                      [
                                        'angularAMD',
                                        'angular-cookies',
                                        'angular-route',
                                        'angular-ui-tabs',
                                        'alv-ch-ng.common',
                                        'alv-ch-ng.i18n',
                                        'alv-ch-ng.ui-core',
                                        'alv-ch-ng.ui-forms',
                                        'demo-common.i18n',
                                        'demo-common.constants',
                                        'ng-dev',
                                        'highlightjs'
                                    ]
    },

    // kick start application
    deps: ['app']
});

