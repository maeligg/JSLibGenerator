const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');

// Lint scripts
gulp.task('scripts', () => {
    return gulp.src(['index.js'])
        .pipe(plumber())
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format());
});

gulp.task('watch', function() {
    gulp.watch('index.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);