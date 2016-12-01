var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver'),
    minify = require('gulp-minifier'),
    uglify = require('gulp-uglify')
    streamify = require('gulp-streamify')
    babel = require('gulp-babel');
    
var src = './client',
    app = './app/assets/';

gulp.task('js', function() {
  return gulp.src( src + '/js/app.js' )
    .pipe(browserify({
      transform: ['reactify', 'babelify'],
      debug: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(babel({presets: ['es2015']}))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(app + '/javascripts'))
});

gulp.task('watch', function() {
  gulp.watch( src + '/js/**/*.js', ['js']);
});

gulp.task('webserver', function() {
  gulp.src( app + '/')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['watch', 'js', 'webserver']);
