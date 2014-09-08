'use strict';

var jjencode = require('./jjencode');
var fs = require('fs');

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            all: {
                files: {
                    '.tmp/main.min.js': ['src/main.js'],
                    '.tmp/popup.min.js': ['.tmp/popup.all.js']
                }
            }
        },
        htmlmin: {
            popup: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    '.tmp/popup.html': 'src/popup.html'
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            all: {
                src: ['src/tinybox.js', '.tmp/popup.js'],
                dest: '.tmp/popup.all.js'
            }
        },
        copy: {
            build: {
                files: [
                    {src: [ '.tmp/*.txt', '.tmp/popup.min.js', 'src/*.css'], dest: 'dist/', expand: true, flatten: true},
                    {src: [ 'src/images/**'], dest: 'dist/images', expand: true, filter: 'isFile', flatten: true }
                ]
            }
        },
        cowsay: {
            moo: {
                options: {
                    face: 'dragon-and-cow'
                }
            }
        },
        clean: {
            build: {
                src: [ 'dist', '.tmp']
            },
            tmp: {
                src: [ '.tmp']
            }
        },
        buildcontrol: {
            options: {
                dir: 'dist',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'git@github.com:xebia-france/stackoverflow-job-advertisement.git',
                    branch: 'gh-pages'
                }
            }
        }
    });


    grunt.registerTask('cow', 'JJencode -> cowsay', function () {
        var input = grunt.file.read(".tmp/main.min.js");
        var out = jjencode("_", input);
        grunt.file.write(".tmp/cow_sentence.txt", out);
        grunt.task.run('cowsay');
        //grunt.task.run('clean');
    });

    grunt.registerTask("inline_popup_html", "Inline the index.html content in popup.js", function () {
        var js = grunt.file.read('src/popup.js');
        var htmlToInline = grunt.file.read('.tmp/popup.html');
        grunt.file.write('.tmp/popup.js', grunt.template.process(js, {data: {html: htmlToInline}}));
    });

    grunt.registerTask('dist', ['clean', 'htmlmin:popup', 'inline_popup_html', 'concat', 'uglify', 'cow', 'copy', 'clean:tmp']);
    grunt.registerTask('gh-pages', ['dist', 'buildcontrol:pages']);
};
