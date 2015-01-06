;(function () {
    'use strict';

    module.exports = function (grunt) {
        // load all grunt tasks matching the `grunt-*` pattern
        require('load-grunt-tasks')(grunt);
        // require it at the top and pass in the grunt instance
        require('time-grunt')(grunt);

        // Project configuration.
        grunt.initConfig({
            'build-alv-ch': {
                'options': {
                    'defaultEnvironment': 'dev'
                },
                'all': {
                    'common': {
                        'src': 'build/build.json'
                    },
                    'builds': {
                        'ci':  {
                            'src': 'build/dist/build.json'
                        },
                        'dev':  {
                            'src': 'build/dev/build.json'
                        },
                        'dist':  {
                            'src': 'build/dist/build.json'
                        },
                        'src':  {
                            'src': 'build/src/build.json'
                        }
                    }
                }
            },
            "jshint": {
                'dev': {
                    'options': {
                        'jshintrc': '.jshintrc'
                    },
                    'files': {
                        'src': 'src/js/**/*.js'
                    }
                }
            },
            clean: {
                all: ['dist', 'build'],
                dist: ['dist'],
                build: ['build']
            },
            coveralls: {
                options: {
                    // LCOV coverage file relevant to every target
                    src: '',

                    // When true, grunt-coveralls will only print a warning rather than
                    // an error, to prevent CI builds from failing unnecessarily (e.g. if
                    // coveralls.io is down). Optional, defaults to false.
                    force: false,
                    main: {
                        src: 'reports/coverage/reports/lcov/lcov.info'
                    }
                }
            },
            watch: {
                dev: {
                    files: 'src/js/**/*.js',
                    tasks: ['jshint:dev']
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
                                '!lib/**/*'
                            ],
                            dest: 'dist',
                            filter: 'isFile'
                        }
                    ]
                }
            }
        });

        // CI
        grunt.registerTask('travis', ['build-alv-ch', 'coveralls']);

        // DEV
        grunt.registerTask('dev', ['browserSync', 'watch']);

        // BUILD
        grunt.registerTask('build', ['build-alv-ch']);

        // Default task.
        grunt.registerTask('default', ['clean:dist','copy']);
    };

})();