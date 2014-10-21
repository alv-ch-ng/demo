;(function () {
    "use strict";

    module.exports = function (grunt) {

        // Project configuration.
        grunt.initConfig({

            // Metadata.
            pkg: grunt.file.readJSON("package.json"),
            banner: '/* ' +
                '<%= pkg.title || pkg.name %> - <%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> - ' +
                'Copyright (c) <%= grunt.template.today("yyyy") %> Informatik der Arbeitslosenversicherung; */\n',
            // Task configurations.
            clean: {
                libs: ['public/lib'],
                templates: ['public/template']
            },
            jshint: {
                gruntfile: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: 'Gruntfile.js'
                },
                src: {
                    options: {
                        jshintrc: '.jshintrc'
                    },
                    src: ['public/**/*.js']
                },
                test: {
                    options: {
                        jshintrc: 'test/.jshintrc'
                    },
                    src: ['test/**/*.js', '!test/dev/*.js', '!test/**/helpers/*.helper.js']
                }
            },
            sync: {
                alvChNg: {
                    files: [{
                        cwd: 'components/alv-ch-ng/dist',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/alv-ch-ng'
                    }],
                    verbose: true
                },
                bootstrapUI: {
                    files: [{
                        cwd: 'components/angular-ui-bootstrap/src',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/angular-ui-bootstrap'
                    }],
                    verbose: true
                },
                bootstrap: {
                    files: [{
                        cwd: 'components/bootstrap/dist',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/bootstrap'
                    }],
                    verbose: true
                },
                bootstrapSelect: {
                    files: [{
                        cwd: 'components/bootstrap-select/dist',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/bootstrap-select'
                    }],
                    verbose: true
                },
                highlight: {
                    files: [{
                        cwd: 'components/highlightjs',
                        src: [
                            'styles/**', '*.js'
                        ],
                        dest: 'public/lib/highlightjs'
                    }],
                    verbose: true
                },
                iCheck: {
                    files: [{
                        cwd: 'components/iCheck',
                        src: [
                            '**', '!*.json'
                        ],
                        dest: 'public/lib/icheck'
                    }],
                    verbose: true
                },
                jQuery: {
                    files: [{
                        cwd: 'components/jquery/dist',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/jquery'
                    }],
                    verbose: true
                },
                jQueryProperty: {
                    files: [{
                        cwd: 'components/jquery-i18n-property',
                        src: [
                            '*.js'
                        ],
                        dest: 'public/lib/jquery'
                    }],
                    verbose: true
                },
                jQueryStellar: {
                    files: [{
                        cwd: 'components/jquery.stellar/src',
                        src: [
                            '*.js'
                        ],
                        dest: 'public/lib/jquery'
                    }],
                    verbose: true
                },
                jQueryUI: {
                    files: [{
                        cwd: 'components/jquery-ui',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/jquery-ui'
                    }],
                    verbose: true
                },
                ng: {
                    files: [{
                        cwd: 'components/angular',
                        src: [
                            '*.js', '*.gzip', '*.map', '*.css'
                        ],
                        dest: 'public/lib/angular'
                    }],
                    verbose: true
                },
                ngAMD: {
                    files: [{
                        cwd: 'components/angularAMD',
                        src: [
                            '*.js', '*.map'
                        ],
                        dest: 'public/lib/angular-amd'
                    }],
                    verbose: true
                },
                ngRoute: {
                    files: [{
                        cwd: 'components/angular-route',
                        src: [
                            '*.js', '*.map'
                        ],
                        dest: 'public/lib/angular'
                    }],
                    verbose: true
                },
                ngPlaceholders: {
                    files: [{
                        cwd: 'components/ng-placeholders/dist',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/ng-placeholders'
                    }],
                    verbose: true
                },
                ngSanitize: {
                    files: [{
                        cwd: 'components/angular-sanitize',
                        src: [
                            '*.js', '*.map'
                        ],
                        dest: 'public/lib/angular'
                    }],
                    verbose: true
                },
                ngCookies: {
                    files: [{
                        cwd: 'components/angular-cookies',
                        src: [
                            '*.js', '*.map'
                        ],
                        dest: 'public/lib/angular'
                    }],
                    verbose: true
                },
                ngScroll: {
                    files: [{
                        cwd: 'components/angular-scroll',
                        src: [
                            '*.js', '*.map'
                        ],
                        dest: 'public/lib/angular'
                    }],
                    verbose: true
                },
                ngMocks: {
                    files: [{
                        cwd: 'components/angular-mocks',
                        src: [
                            '*.js'
                        ],
                        dest: 'public/lib/angular-mocks'
                    }],
                    verbose: true
                },
                ngUiBootstrapSrc: {
                    files: [{
                        cwd: 'components/angular-ui-bootstrap/src',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/angular-ui-bootstrap'
                    }],
                    verbose: true
                },
                ngUiBootstrapTemplate: {
                    files: [{
                        cwd: 'components/angular-ui-bootstrap/template',
                        src: [
                            '**'
                        ],
                        dest: 'public/template'
                    }],
                    verbose: true
                },
                ngDev: {
                    files: [{
                        cwd: 'components/ng-dev/dist',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/ng-dev'
                    }],
                    verbose: true
                },
                nyaBootstrapSelect: {
                    files: [{
                        cwd: 'components/nya-bootstrap-select/src',
                        src: [
                            '**'
                        ],
                        dest: 'public/lib/nya-bootstrap-select'
                    }],
                    verbose: true
                },
                requirejs: {
                    files: [{
                        cwd: 'components/requirejs',
                        src: [
                            'require.js'
                        ],
                        dest: 'public/lib/requirejs'
                    }],
                    verbose: true
                },
                webfonts: {
                    files: [{
                        cwd: 'components/components-webfontloader',
                        src: [
                            'webfont.js'
                        ],
                        dest: 'public/lib/components-webfontloader'
                    }],
                    verbose: true
                }
            },
            coveralls: {
                options: {
                    // LCOV coverage file relevant to every target
                    src: '',

                    // When true, grunt-coveralls will only print a warning rather than
                    // an error, to prevent CI builds from failing unnecessarily (e.g. if
                    // coveralls.io is down). Optional, defaults to false.
                    force: false
                },
                all: {
                    src: 'build/coverage/reports/lcov/lcov.info'
                }
            },
            // integration testing with protractor
            protractor_webdriver: {
                start: {
                    options: {
                        command: 'webdriver-manager start'
                    }
                }
            },
            protractor: {
                e2e: {
                    options : {
                        configFile: '../sysinfos-api/src/test/js/integration/conf/protractor.conf.js',
                        keepAlive: false
                    }
                }
            }

        });


        // Tests
        grunt.registerTask('unit-test', ['jasmine']);
        // required modules
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-jasmine');
        grunt.loadNpmTasks('grunt-sync');
        grunt.loadNpmTasks('grunt-coveralls');
        grunt.loadNpmTasks('grunt-protractor-runner');
        grunt.loadNpmTasks('grunt-protractor-webdriver');

        // Tests
        grunt.registerTask('e2e', ['protractor_webdriver:start', 'protractor']);
        grunt.registerTask('lint', ['jshint']);

        // Dependencies
        grunt.registerTask('deps', ['clean', 'sync']);

        // CI
        grunt.registerTask('travis', ['clean', 'sync', ,'jasmine', 'coveralls']);


        // Default task.
        grunt.registerTask('default', ['sync']);
    };


})();