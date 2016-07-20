import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import gulpConcat from 'gulp-concat';
import gulpBrowser from 'gulp-browser';
import webserver from 'gulp-webserver';

let transforms = [
  {
    transform: "babelify",
    options: {presets: ["es2015"]}
  }
];

gulp.task('webserver', () => {
  gulp.src('')
    .pipe(webserver({
      port: '8080',
      livereload: false,
      directoryListing: false,
      open: 'index.html',
      fallback: 'index.html'
    }));
});

gulp.task('styles', () => {
  return gulp.src('src/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/styles/'));
});

gulp.task('babel', () => {
  return gulp.src('src/app.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulpConcat('all.js'))
    .pipe(gulpBrowser.browserify(transforms))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', () => {
  gulp.watch('src/styles/app.scss', ['styles']);
  gulp.watch('src/*/*/*.js', ['babel']);
});

gulp.task('default', ['styles', 'babel', 'watch', 'webserver']);
