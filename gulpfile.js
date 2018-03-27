var del = require('del');
var gulp = require('gulp');
var autoprefix = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var uglify = require ('gulp-uglify');

gulp.task('default', ['css', 'js', 'images'], function() {
	gulp.watch('stylesheets/*.css', function() {
		gulp.run('css');
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('css', function() {
	gulp.src(['stylesheets/*.css'])
	.pipe(concat('style.css'))
	.pipe(autoprefix('last 2 versions'))
	.pipe(cleanCSS())
	.pipe(gulp.dest('dist/stylesheets/'));
});

gulp.task('js', function(){
   gulp.src('src/app/**/*.js')
   .pipe(concat('script.js'))
   .pipe(uglify())
   .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('images', function() {
	var img_src = 'images/*', img_dest = 'dist/images';

	gulp.src(img_src)
	.pipe(changed(img_dest))
	.pipe(imagemin())
	.pipe(gulp.dest(img_dest));
});