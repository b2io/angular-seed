var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var del = require('del');
var eslint = require('gulp-eslint');
var filter = require('gulp-filter');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var karma = require('karma').server;
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var ngAnnotate = require('gulp-ng-annotate');
var partialify = require('partialify');
var path = require('path');
var pipe = require('multipipe');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var size = require('gulp-size');
var stripDebug = require('gulp-strip-debug');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var watchify = require('watchify');

// Helpers:

function bundleScripts(watch) {
  var bundler = browserify('./src/app.js', {debug: watch})
    .transform(partialify)
    .transform(babelify.configure({ignore: 'bower_components'}));

  function rebundle() {
    return bundler.bundle()
      .on('error', function(error) {
        gutil.log(gutil.colors.red(error));
        this.emit('end');
      })
      .on('log', gutil.log)
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(ngAnnotate({single_quotes: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./.tmp'))
      .pipe(gulpif(watch, browserSync.stream({once: true})))
      .pipe(size());
  }

  if (watch) bundler = watchify(bundler).on('update', rebundle);

  return rebundle();
}

// Tasks:

gulp.task('browser-sync', function() {
  browserSync.init({server: ['src', '.tmp']});

  gulp.watch('src/index.html').on('change', browserSync.reload);
});

gulp.task('build', function(cb) {
  runSequence('clean', ['scripts:build', 'styles'], 'html', cb);
});

gulp.task('clean', function(cb) {
  del(['.tmp', 'dist'], cb);
});

gulp.task('html', function() {
  var assets = useref.assets();
  var cssFilter = filter(['**/*.css'], {restore: true});
  var htmlFilter = filter(['*.html'], {restore: true});
  var jsFilter = filter(['**/*.js'], {restore: true});

  return gulp.src('src/*.html')
    .pipe(assets)
    .pipe(cssFilter)
    .pipe(minifyCss())
    .pipe(cssFilter.restore)
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(stripDebug())
    .pipe(jsFilter.restore)
    .pipe(rev())
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(htmlFilter)
    .pipe(minifyHtml())
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest('dist'))
    .pipe(size());
});

gulp.task('lint:js', function() {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(size());
});

gulp.task('scripts', ['lint:js'], function() {
  return bundleScripts(true);
});

gulp.task('scripts:build', function() {
  return bundleScripts(false);
});

gulp.task('serve', function(cb) {
  runSequence('clean', ['scripts', 'styles'], 'watch', 'browser-sync', cb);
});

gulp.task('styles', function() {
  return gulp.src('src/app.scss')
    .pipe(plumber(function(error) {
      gutil.log(gutil.colors.red(error.message));
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    .pipe(rename('bundle.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./.tmp'))
    .pipe(browserSync.stream({once: true}))
    .pipe(size());
});

gulp.task('test', function(cb) {
  karma.start({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true,
    autoWatch: false,
    reporters: ['dots'],
  }, cb);
});

gulp.task('test:tdd', function(cb) {
  karma.start({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false,
    autoWatch: true,
    reporters: ['dots'],
  }, cb);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch('src/**/*.js', ['lint:js']);
});

gulp.task('default', ['serve']);
