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
                dist: ['dist'],
                demo: ['src/ng','src/js','src/lib']
            },
            copy: {
                options: {
                    banner: '<%= banner %>'
                },
                main: {
                    files: [
                        {
                            expand: true,
                            flatten: false,
                            cwd: 'src/',
                            src: [
                                '**/*',
                                '!fonts/**/*',
                                '!lib/**/*',
                                '!js/**/*',
                                '!ng/**/*'
                            ],
                            dest: 'dist',
                            filter: 'isFile'
                        }
                    ]
                },
                demo: {
                    files: [
                        {
                            expand: true,
                            cwd: 'lib/bootstrap/',
                            src: 'fonts/*',
                            dest: 'src/lib/bootstrap/'
                        },
                        {
                            expand: true,
                            cwd: 'lib/bootstrapaccessibilityplugin/plugins/css/',
                            src: '**/bootstrap-accessibility.css',
                            dest: 'src/lib/styles'
                        },
                        {
                            expand: true,
                            cwd: 'lib/octicons/octicons/',
                            src: '**/*',
                            dest: 'src/lib/styles/octicons'
                        },
                        {
                            expand: true,
                            cwd: 'lib/highlightjs/styles/',
                            src: '**/github.css',
                            dest: 'src/lib/styles'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng/dist/css/',
                            src: '*.css',
                            dest: 'src/lib'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng/dist/',
                            src: ['*.js','!*.common*js'],
                            dest: 'src/ng'
                        },
                        {
                            expand: true,
                            cwd: 'lib/alv-ch-ng/dist/',
                            src: '*.common*js',
                            dest: 'src/js'
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
            uglify: {
                common: {
                    options: {
                        mangle: false
                    },
                    files: {
                        'src/lib/lib.min.js': [
                            'lib/jquery/dist/jquery.js',
                            'lib/jquery-i18n-property/jquery.i18n.properties.js',
                            'lib/bootstrap/dist/js/bootstrap.js',
                            'lib/bootstrap-select/dist/js/bootstrap-select.js',
                            'lib/bootstrapaccessibilityplugin/plugins/js/bootstrap-accessibility.js',
                            'lib/angular/angular.js',
                            'lib/autofill-event/src/autofill-event.js',
                            'lib/angular-cookies/angular-cookies.js',
                            'lib/angular-route/angular-route.js',
                            'lib/angular-sanitize/angular-sanitize.js',
                            'lib/angular-scroll/angular-scroll.js',
                            'lib/angular-ui-bootstrap/src/bindHtml/bindHtml.js',
                            'lib/angular-ui-bootstrap/src/position/position.js',
                            'lib/angular-ui-bootstrap/src/tabs/tabs.js',
                            'lib/angular-ui-bootstrap/src/tooltip/tooltip.js',
                            'lib/angular-ui-bootstrap/src/typeahead/typeahead.js',
                            'lib/ng-dev/dist/ng-dev.js',
                            'lib/highlightjs/highlight.pack.js'
                        ]
                    }
                }
            },
            cssbeautifier: {
                options: {
                    banner: '<%= banner %>'
                },
                dist: {
                    files: {
                        'dist/css/alv-ch-ng.demo.css': ['src/css/alv-ch-ng.demo.css']
                    }
                }
            },
            csslint: {
                strict: {
                    options: {
                        import: 2
                    },
                    src: ['dev/css/**/*.css', '!dev/css/themes/**/*.css']
                }
            },
            htmlhint: {
                options: {
                    htmlhintrc: '.htmlhintrc'
                },
                html: {
                    src: ['dev/**/*.html']
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
                    src: ['src/**/*.js']
                }
            },
            watch: {
                src: {
                    files: 'src/scripts/**/*.js',
                    tasks: ['jshint']
                },
                css: {
                    'files': 'src/styles/**/*.css',
                    'tasks': ['csslint']
                },
                html: {
                    'files': 'src/**/*.html',
                    'tasks': ['htmlhint']
                }
            },
            browserSync: {
                dev: {
                    bsFiles: {
                        src : 'src/**/*'
                    },
                    options: {
                        watchTask: true
                    }
                }
            }
        });

        // CI
        grunt.registerTask('travis', ['htmlhint', 'csslint', 'jshint', 'clean']);

        // DEV
        grunt.registerTask('prepare', ['clean:demo','copy:demo','uglify']);
        grunt.registerTask('dev', ['browserSync','watch']);

        // Default task.
        grunt.registerTask('default', ['clean','htmlhint', 'csslint', 'jshint','copy','cssbeautifier']);
    };


})();