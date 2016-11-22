/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GRUNT
 * The grunt wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/

module.exports = function (grunt) {

  var path = require('path'),
      argv = require('minimist')(process.argv.slice(2));

  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-sass');

  /******************************************************
   * PATTERN LAB CONFIGURATION
  ******************************************************/

  //read all paths from our namespaced config file
  var config = require('./patternlab-config.json'),
    pl = require('patternlab-node')(config);

  function paths() {
    return config.paths;
  }

  function getConfiguredCleanOption() {
    return config.cleanPublic;
  }

  grunt.registerTask('patternlab', 'create design systems with atomic design', function (arg) {

    if (arguments.length === 0) {
      pl.build(function(){}, getConfiguredCleanOption());
    }

    if (arg && arg === 'version') {
      pl.version();
    }

    if (arg && arg === "patternsonly") {
      pl.patternsonly(function(){},getConfiguredCleanOption());
    }

    if (arg && arg === "help") {
      pl.help();
    }

    if (arg && arg === "starterkit-list") {
      pl.liststarterkits();
    }

    if (arg && arg === "starterkit-load") {
      pl.loadstarterkit(argv.kit);
    }

    if (arg && (arg !== "version" && arg !== "patternsonly" && arg !== "help" && arg !== "starterkit-list" && arg !== "starterkit-load")) {
      pl.help();
    }
  });


  grunt.initConfig({

    sass: {
      dist: {
        options: {
          //compass: true,
          includePaths: [
            "node_modules/compass-mixins/lib",
            "node_modules/susy/sass"
          ]
        },
        files: [{
          expand: true,
          cwd: './source/_scss/',
          src: ['*.scss'],
          dest: './public/css/',
          ext: '.css'
        }]
      }
    },

    /******************************************************
     * COPY TASKS
    ******************************************************/
    copy: {
      main: {
        files: [
          { expand: true, cwd: path.resolve(paths().source.js), src: '**/*', dest: path.resolve(paths().public.js) },
          { expand: true, cwd: path.resolve(paths().source.css), src: '*.css', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().fontAwesome.css), src: '*.css', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().fontAwesome.fonts), src: '*', dest: path.resolve(paths().public.fonts) },
          { expand: true, cwd: path.resolve(paths().source.images), src: '*', dest: path.resolve(paths().public.images) },
          { expand: true, cwd: path.resolve(paths().source.fonts), src: '*', dest: path.resolve(paths().public.fonts) },
          { expand: true, cwd: path.resolve(paths().source.root), src: 'favicon.ico', dest: path.resolve(paths().public.root) },
          { expand: true, cwd: path.resolve(paths().source.styleguide), src: ['*', '**'], dest: path.resolve(paths().public.root) }
        ]
      },
      dist: {
        files: [
          { expand: true, cwd: path.resolve(paths().public.js), src: '**/*', dest: path.resolve(paths().dist.js) },
          { expand: true, cwd: path.resolve(paths().public.css), src: '*.css', dest: path.resolve(paths().dist.css) },
          { expand: true, cwd: path.resolve(paths().public.images), src: '*', dest: path.resolve(paths().dist.images) },
          { expand: true, cwd: path.resolve(paths().public.fonts), src: '*', dest: path.resolve(paths().dist.fonts) },
        ]
      }
    },
    /******************************************************
     * SERVER AND WATCH TASKS
    ******************************************************/
    watch: {
      all: {
        files: [
          'source/_scss/**/*.scss',
          path.resolve(paths().source.patterns + '**/*'),
          path.resolve(paths().source.fonts + '*'),
          path.resolve(paths().source.images + '*'),
          path.resolve(paths().source.data + '*.json'),
          path.resolve(paths().source.js + '**/*'),
          path.resolve(paths().source.root + '/*.ico')
        ],
        tasks: ['default', 'bsReload:css']
      }
    },
    browserSync: {
      dev: {
        options: {
          server:  path.resolve(paths().public.root),
          watchTask: true,
          watchOptions: {
            ignoreInitial: true,
            ignored: '*.html'
          },
          snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
          },
          plugins: [
            {
              module: 'bs-html-injector',
              options: {
                files: [path.resolve(paths().public.root + '/index.html'), path.resolve(paths().public.styleguide + '/styleguide.html')]
              }
            }
          ],
          notify: {
            styles: [
              'display: none',
              'padding: 15px',
              'font-family: sans-serif',
              'position: fixed',
              'font-size: 1em',
              'z-index: 9999',
              'bottom: 0px',
              'right: 0px',
              'border-top-left-radius: 5px',
              'background-color: #1B2032',
              'opacity: 0.4',
              'margin: 0',
              'color: white',
              'text-align: center'
            ]
          }
        }
      }
    },
    bsReload: {
      css: path.resolve(paths().public.root + '**/*.css')
    }
  });

  /******************************************************
   * COMPOUND TASKS
  ******************************************************/

  grunt.registerTask('default', ['patternlab', 'sass', 'copy:main']);
  grunt.registerTask('patternlab:watch', ['patternlab', 'sass', 'copy:main', 'watch:all']);
  grunt.registerTask('patternlab:serve', ['patternlab', 'sass', 'copy:main', 'browserSync', 'watch:all']);
  grunt.registerTask('patternlab:dist', ['patternlab', 'sass', 'patternlab:build', 'copy:main', 'copy:dist']);
  grunt.registerTask('patternlab:buildserve', ['patternlab', 'sass', 'patternlab:build', 'copy:main', 'browserSync', 'watch:all']);

};
