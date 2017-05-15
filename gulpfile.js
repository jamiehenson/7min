var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-cssnano'),
    prefix      = require('gulp-autoprefixer'),
    sourcemaps  = require('gulp-sourcemaps');
    runSequence = require('run-sequence');

gulp.task('styles', function() {
  return gulp.src('7min.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(prefix({ browsers: ['last 2 versions'] }))
    .pipe(cssmin())
    .pipe(gulp.dest(''))
});

gulp.task('watch', function() {
  gulp.watch('*.scss', ['styles']);
});

gulp.task('default', function(done) {
  runSequence('styles', 'watch', done);
});

gulp.task('build', function(done) {
  runSequence('styles', done);
});
