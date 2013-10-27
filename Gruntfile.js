module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var project = {
    js: {
      files: [
        'Gruntfile.js',
        'bin/*',
        'lib/*'
      ]
    },

    sass: {
      src: 'assets/sass/style.scss',
      dest: 'assets/css/style.css'
    },

    site: {
      build: 'geno',
      src: 'site/',
      dest: '../gh-pages/'
    }
  };

  grunt.initConfig({
    project: project,

    jshint: {
      files: project.js.files
    },

    sass: {
      build: {
        options: {
          style: 'compressed'
        },

        files: {
          '<%= project.sass.dest %>' : '<%= project.sass.src %>'
        }
      }
    },

    shell: {
      site: {
        options: {
          stdout: true
        },
        command: project.site.build
      }
    },

    copy: {
      site: {
        files: [{
          expand: true,
          cwd: project.site.src,
          src: ['**'],
          dest: project.site.dest
        }]
      }
    }
  });

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('site', ['sass', 'shell', 'copy']);

};
