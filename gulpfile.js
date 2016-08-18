//gulpfile.js

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('connect', function () {
  connect.server({
	  root: './src',
	  port: 8000
  });
});

gulp.task('jsreload', function () {
	gulp.src('js/*.js')
		.pipe(livereload());
});

gulp.task('cssreload', function () {
	gulp.src('css/*.css')
		.pipe(livereload());
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('src/*');
});

// create a default task and just log a message
gulp.task('default', ['connect', 'watch']);
