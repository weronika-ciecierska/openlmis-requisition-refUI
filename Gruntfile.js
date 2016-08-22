module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      clean: ['dist', 'src/main/webapp/public/minJs/', 'quality', 'src/main/webapp/messages_*.json', 'src/test/coverage/', 'src/test/karma/'],
      jshint: {
        options: {
          undef: false,
          strict: false,
          '-W030': true,
          unused: false,
          passfail: true,
          reporter: 'checkstyle',
          reporterOutput: 'quality/js/checkstyle-results.xml'
        },
        all: ['src/main/webapp/public/js/**/*.js']
      },
      lesslint: {
        src: ['src/main/webapp/public/less/*.less', '!**/ng-grid.less'],
        options: {
          quiet: true,
          formatters: [
            {id: 'checkstyle-xml', dest: 'quality/less/checkstyle-results.xml'}
          ],
          csslint: {
            ids: false,
            "bulletproof-font-face": false,
            "box-model": false,
            "box-sizing": false
          }
        }
      },
      less: {
        compile: {
          files: [
            {
              expand: true,
              cwd: "src/main/webapp/public/less/",
              src: ["**/*.less"],
              dest: "src/main/webapp/public/css/",
              ext: ".css",
              flatten: false
            }
          ]
        }
      },
      watch: {
        files: "src/main/webapp/public/less/*.less",
        tasks: ["less"],
        options: {
          spawn: false
        }
      },
      uglify: {
        options: {
          mangle: false,
          beautify: true,
          report: 'min',
          preserveComments: false
        },
        files: {
            cwd: 'src/main/webapp/public/js/',
            src: ['**/*.js'],
            dest: 'src/main/webapp/public/minJs/',
            expand: true,
            flatten: false
        }
      },
      serve: {
        options: {
              port: 9000,
              serve: {
                path: './src/main/webapp/'
              }
          }
      },
   propertiesToJSON: {
          main: {
              src: ['src/main/resources/messages_*.properties'],
              dest: 'src/main/webapp'
          }
      },
   karma: {
       unit: {
       configFile: 'karma.config.js'
    }
  }
   });
  grunt.registerTask('default', ['clean', 'propertiesToJSON', 'less', 'uglify']);
  grunt.registerTask('check', ['clean', 'jshint', 'lesslint']);
  grunt.registerTask('test', 'karma')
};