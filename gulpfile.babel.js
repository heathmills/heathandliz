'use strict';

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import swPrecache from 'sw-precache';
import gulpLoadPlugins from 'gulp-load-plugins';
import {output as pagespeed} from 'psi';
import pkg from './package.json';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Optimize images
gulp.task('images', () =>
  gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}))
);

// Copy all files at the root level (app)
gulp.task('copy', () =>
  gulp.src([
    'app/*',
    '!app/*.html',
    'app/video/*',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
);

gulp.task('copyFonts', function () {
  var fontsFilesToCopy = [
    "app/fonts/*.{ttf,woff,eof,svg}",
    "app/fonts/fontello/font/*.{ttf,woff,eof,svg}"
  ];
  return gulp.src(fontsFileToCopy).pipe(gulp.dest('./build'));
});

// Compile and automatically prefix stylesheets
gulp.task('css', function () {
  var processors = [
    atImport(),
    autoprefixer({browsers: ['last 3 versions']}),
    cssnano(),
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src('app/css/style.css')
    .pipe($.sourcemaps.init())
    .pipe($.postcss(processors))
    .pipe($.size({title: 'css'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'));
});

// Concatenate and minify JavaScript. Optionally transpiles ES2015 code to ES5.
// to enable ES2015 support remove the line `"only": "gulpfile.babel.js",` in the
// `.babelrc` file.
gulp.task('js', () =>
    gulp.src([
      // Note: Since we are not using useref in the js build pipeline,
      //       you need to explicitly list your js here in the right order
      //       to be correctly concatenated
      './node_modules/jquery/dist/jquery.js',
      './node_modules/pace-js/pace.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
      './node_modules/npm-modernizr/modernizr.js',
      // './app/js/devicejs/device.js'
      './node_modules/tinynav/dist/tinynav.js',
      './node_modules/jquery-smooth-scroll/jquery.smooth-scroll.js',
      './node_modules/jquery-sticky/jquery.sticky.js',
      './node_modules/waypoints/lib/jquery.waypoints.js',
      // './app/js/jquery-ui-widget/jquery.ui.widget.js'
      // './app/js/jquery-doubletaptogo/jquery.dcd.doubletaptogo.js'
      './node_modules/parallaxjs/parallax.js',
      './node_modules/masonry-layout/dist/masonry.pkgd.js',
      './node_modules/jquery.countdown/jquery.plugin.js',
      './node_modules/jquery.countdown/jquery.countdown.js',
      './node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      './node_modules/owlcarousel/owl-carousel/owl.carousel.js',
      './app/js/googleMaps.js',
      './node_modules/map-icons/dist/js/map-icons.js',
      './node_modules/bootstrap-validator/dist/validator.js',
      './node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
      './app/js/main.js',
      './app/js/map-script.js',
      './app/js/contactSubmit.js'
      // Other scripts
    ])
      .pipe($.newer('.tmp/js'))
      .pipe($.sourcemaps.init())
      .pipe($.concat('main.min.js'))
      .pipe($.uglify({preserveComments: 'none'}))
      // Output files
      .pipe($.size({title: 'js'}))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('dist/js'))
);

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src('app/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))

    // Minify any HTML
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: false,
      removeEmptyAttributes: false,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeOptionalTags: false
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
});

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['js', 'css'], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'H&L',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/css/**/*.css'], ['css', reload]);
  gulp.watch(['app/js/**/*.js'], ['js', reload]);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], () =>
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  })
);

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    'css',
    ['html', 'js', 'images', 'copy', 'copyFonts'],
    'generate-service-worker',
    cb
  )
);

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  // Update the below URL to the public URL of your site
  pagespeed('example.com', {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb)
);

// Copy over the scripts that are used in importScripts as part of the generate-service-worker task.
gulp.task('copy-sw-scripts', () => {
  return gulp.src(['node_modules/sw-toolbox/sw-toolbox.js', 'app/js/sw/runtime-caching.js'])
    .pipe(gulp.dest('dist/js/sw'));
});

// See http://www.html5rocks.com/en/tutorials/service-worker/introduction/ for
// an in-depth explanation of what service workers are and why you should care.
// Generate a service worker file that will provide offline functionality for
// local resources. This should only be done for the 'dist' directory, to allow
// live reload to work as expected when serving from the 'app' directory.
gulp.task('generate-service-worker', ['copy-sw-scripts'], () => {
  const rootDir = 'dist';
  const filepath = path.join(rootDir, 'service-worker.js');

  return swPrecache.write(filepath, {
    // Used to avoid cache conflicts when serving on localhost.
    cacheId: pkg.name || 'web-starter-kit',
    // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
    importScripts: [
      'js/sw/sw-toolbox.js',
      'js/sw/runtime-caching.js'
    ],
    staticFileGlobs: [
      // Add/remove glob patterns to match your directory setup.
      `${rootDir}/images/**/*`,
      `${rootDir}/js/**/*.js`,
      `${rootDir}/css/**/*.css`,
      `${rootDir}/*.{html,json}`
    ],
    // Translates a static file path to the relative URL that it's served from.
    // This is '/' rather than path.sep because the paths returned from
    // glob always use '/'.
    stripPrefix: rootDir + '/'
  });
});

// Load custom tasks from the `tasks` directory
// Run: `npm install --save-dev require-dir` from the command-line
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
