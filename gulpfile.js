'use strict';

//Require the plugins
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var minify = require('gulp-minify');

//Folder dest.
var sassDir = 'sass/*.scss';
var cssDir = 'css/min/';
var sourcemapDir = '/maps';
var jsDir = 'js/*.js';
var jsMinDir = 'js/min/';

//Sass Options
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed' //compressed or expanded
};

// Styles Task
gulp.task('styles', function() {
    gulp.src(sassDir)
    	.pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write(sourcemapDir))
        .pipe(gulp.dest(cssDir));
});

// JS Task
gulp.task('js', function() {
  gulp.src(jsDir)
    .pipe(minify({
        ext:{
          min:'.min.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest(jsMinDir))
});

gulp.task('default', function(){
  gulp.watch(sassDir, ['styles']);
  gulp.watch(jsDir, ['js']);
});