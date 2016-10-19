var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');

/**
 * Deafault Task
 * Watch .scss files for changes and build styles.css automaticaly
 * $ gulp
 */
gulp.task('default', ['css', 'watch']);


/**
 * Set Up Task
 * Copies bootstrap to projects directory
 * $ gulp bootstrap
 */

gulp.task('bootstrap', function() {
    gulp.src('./node_modules/bootstrap/scss/**/*')
        .pipe(gulp.dest('./css/bootstrap'));

    gulp.src('./node_modules/bootstrap/dist/js/**/*')
        .pipe(gulp.dest('./js'));

});

/**
 * Build Task
 * $ gulp css
 */
gulp.task('css', function() {

    return gulp.src('css/styles.scss')
               .pipe(sourcemaps.init())
               .pipe(sass({
                    outputStyle: 'compact',
                    includePaths: 'css/bootstrap/',
                  }))
               .pipe(autoprefixer('last 10 versions', 'ie 9'))
               .pipe(sourcemaps.write('../css/'))
               .pipe(gulp.dest('css/'));
});
/**
 * Watch Task
 */
gulp.task('watch', function() {
    gulp.watch('css/*.scss', ['css']);
});
