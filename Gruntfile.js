'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scss: {
        files: ['scss/**/*.scss'],
        tasks: ['compass']
      },
      js: {
        files: ['public/**/*.js'],
        tasks: ['uglify']
      }
    },

    uglify: {
      build: {
        files: {
          'main.min.js': ['main.js'],
        }
      }
    },

    compass: {

    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['compass', 'uglify']);
};