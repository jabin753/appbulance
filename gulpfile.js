var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

//Copiado de librerías de dependencias
gulp.task('vendor', function() {
  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
  ])
  .pipe(gulp.dest('./src/public/vendor/bootstrap'))
  // ChartJS
  gulp.src([
    './node_modules/chart.js/dist/*.js'
  ])
  .pipe(gulp.dest('./src/public/vendor/chart.js'))
  // DataTables
  gulp.src([
    './node_modules/datatables.net/js/*.js',
    './node_modules/datatables.net-dt/js/*.js',
    './node_modules/datatables.net-buttons/js/*.js',
    './node_modules/datatables.net-dt/css/*.css',
    './node_modules/datatables.net-select/js/*.js'
  ])
  .pipe(gulp.dest('./src/public/vendor/datatables/'))
  gulp.src([
    './node_modules/datatables.net-dt/images/*.png'
  ])
  .pipe(gulp.dest('./src/public/vendor/images/'))
  // Font Awesome
  gulp.src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
  ])
  .pipe(gulp.dest('./src/public/vendor/font-awesome'))
  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
  .pipe(gulp.dest('./src/public/vendor/jquery'))
  // jQuery Easing
  gulp.src([
    './node_modules/jquery.easing/*.js'
  ])
  .pipe(gulp.dest('./src/public/vendor/jquery-easing'))
  // Socket.io
  gulp.src([
      './node_modules/socket.io-client/dist/*.js'
  ])
  .pipe(gulp.dest('./src/public/vendor/socket-io'))
});

//Minificado de css

gulp.task('css:minify', function() {
  return gulp.src([
    './src/public/CSS/**/*.css',
    '!./src/public/CSS/**/*.min.css'
  ])
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./src/public/CSS'));
});
gulp.task('css', ['css:minify']);

//Minificado de js

gulp.task('js:minify', function() {
  return gulp.src([
    './src/public/js/**/*.js',
    '!./src/public/js/**/*.min.js'
  ])
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./src/public/js'));
});
gulp.task('js', ['js:minify']);

//Default

gulp.task('build',['css','js','vendor']);

//Servidor para desarrollo

gulp.task('dev',['vendor'], function(done){
  nodemon({
    script: './src/index.js'
    , ext: 'js'
    , ignore: ['./src/public','./src/views']
    , env: { 'NODE_ENV': 'development' }
    , done: done
  });
  gulp.watch('./src/public/CSS/**/*.css',['css']);
  gulp.watch('./src/public/js/**/*.js',['js']);
});