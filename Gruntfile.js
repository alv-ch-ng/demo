;(function () {
    'use strict';

    module.exports = function (grunt) {
        require('load-grunt-tasks')(grunt, {
            pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
        });
        require('time-grunt')(grunt);

        // Project configuration.
        grunt.initConfig({

            // Metadata.
            pkg: grunt.file.readJSON('package.json'),
            banner: '/* ' +
                '<%= pkg.title || pkg.name %> - <%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> - ' +
                'Copyright (c) <%= grunt.template.today("yyyy") %> Informatik der Arbeitslosenversicherung; */\n',

            // Task configurations.
            clean: {
                demo: ['src/scripts/lib','src/styles','src/fonts','!src/styles/demo.css']
            },
            copy: {
                options: {
                    banner: '<%= banner %>'
                },
                demo: {
                    files: [
                        {
                            expand: true,
                            cwd: 'lib/bootstrap/fonts/',
                            src: '*',
                            dest: 'src/fonts/'
                        },
                        {
                            expand: true,
                            cwd: 'lib/bootstrapaccessibilityplugin/plugins/css/',
                            src: '**/bootstrap-accessibility.css',
                            dest: 'src/styles'
                        },
                        {
                            expand: true,
                            cwd: 'lib/ng-dev/dist/css/',
                            src: 'github.min.css',
                            dest: 'src/styles'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng.style/dist/css/',
                            src: '*min.css',
                            dest: 'src/styles'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng.core/dist/example/pages/',
                            src: '**/*.html',
                            dest: 'src/pages/core'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng.forms/dist/example/pages/',
                            src: '**/*.html',
                            dest: 'src/pages/forms'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng.scroll/dist/example/pages/',
                            src: '**/*.html',
                            dest: 'src/pages/scroll'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng.selectpicker/dist/example/pages/',
                            src: '**/*.html',
                            dest: 'src/pages/selectpicker'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng.text-truncate/dist/example/pages/',
                            src: '**/*.html',
                            dest: 'src/pages/text-truncate'
                        },
                        {
                            expand: true,
                            cwd: 'private/fonts',
                            src: '**/*',
                            dest: 'src/fonts'
                        }
                    ]
                }
            },
            'concat_css': {
                demo: {
                    src: ['lib/alv-ch-ng.core/dist/css/core.min.css','lib/alv-ch-ng.forms/dist/css/forms.min.css','lib/alv-ch-ng.scroll/dist/css/scroll.min.css','lib/alv-ch-ng.selectpicker/dist/css/selectpicker.min.css','lib/alv-ch-ng.text-truncate/dist/css/textTruncate.min.css'],
                    dest: 'src/styles/alv-ch-ng.css'
                }
            },
            uglify: {
                common: {
                    options: {
                        'mangle': false
                    },
                    files: {
                        'src/scripts/lib/lib.min.js': [
                            'lib/jquery/dist/jquery.js',
                            'lib/bootstrap/dist/js/bootstrap.js',
                            'lib/bootstrap-tour/build/js/bootstrap-tour.js',
                            'lib/angular/angular.js',
                            'lib/angular-aria/angular-aria.js',
                            'lib/angular-cookies/angular-cookies.js',
                            'lib/angular-route/angular-route.js',
                            'lib/angular-sanitize/angular-sanitize.js',
                            'lib/angular-resource/angular-resource.js',
                            'lib/angular-scroll/angular-scroll.js',
                            'lib/angular-bootstrap-tour/dist/angular-bootstrap-tour.js',
                            'lib/angular-translate/angular-translate.js',
                            'lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                            'lib/angular-translate-storage-local/angular-translate-storage-local.js',
                            'lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                            'lib/ng-lodash/build/ng-lodash.js',
                            'lib/bootstrap-select/dist/js/bootstrap-select.min.js',
                            'lib/mailcheck/src/mailcheck.min.js',
                            'lib/angular-ui-bootstrap/src/typeahead/typeahead.js',
                            'lib/angular-ui-bootstrap/src/tooltip/tooltip.js',
                            'lib/angular-ui-bootstrap/src/position/position.js',
                            'lib/angular-ui-bootstrap/src/bindHtml/bindHtml.js',
                            'lib/alv-ch-ng.core/dist/alv-ch-ng.core.js',
                            'lib/alv-ch-ng.forms/dist/alv-ch-ng.forms.js',
                            'lib/alv-ch-ng.scroll/dist/alv-ch-ng.scroll.js',
                            'lib/alv-ch-ng.selectpicker/dist/alv-ch-ng.selectpicker.js',
                            'lib/alv-ch-ng.text-truncate/dist/alv-ch-ng.textTruncate.js',
                            'lib/ng-dev/dist/ng-dev.js',
                            'lib/highlightjs/highlight.pack.js'
                        ]
                    }
                }
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
                    src: ['src/scripts/*.js']
                }
            },
            watch: {
                src: {
                    files: 'src/scripts/**/*.js',
                    tasks: ['jshint']
                }
            },
            browserSync: {
                dev: {
                    bsFiles: {
                        src : 'src/**/*'
                    },
                    options: {
                        server: {
                            baseDir: './src',
                            directory: false
                        },
                        watchTask: true
                    }
                }
            }
        });

        // CI
        grunt.registerTask('travis', ['jshint']);

        // DEV
        grunt.registerTask('prepare', ['clean:demo','copy:demo','concat_css:demo','uglify']);
        grunt.registerTask('dev', ['prepare','browserSync','watch']);

        // Default task.
        grunt.registerTask('default', ['prepare','copy:dist']);
    };


})();