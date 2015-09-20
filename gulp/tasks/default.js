'use strict';

let gulp = require('gulp');

gulp.task('default', ['serve'], function(){
  gulp.watch('./app/js/**/*.js', ['browserify']);
  gulp.watch('./app/**/*.html', ['views']);
  gulp.watch('./app/less/**/*.less', ['less']);
});
