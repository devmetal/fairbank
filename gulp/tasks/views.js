'use strict';

let gulp        = require('gulp');
let merge       = require('merge-stream');
let template    = require('gulp-angular-templatecache');
let browserSync = require('browser-sync');

gulp.task('views', function(){
  let index = gulp.src('app/index.html')
    .pipe(gulp.dest('public/'));

  let views = gulp.src('app/views/**/*.html')
    .pipe(template({
      standalone: true
    }))
    .pipe(gulp.dest('app/js'));

  return merge(index, views)
    .pipe(browserSync.reload({stream:true, one:true}));
});
