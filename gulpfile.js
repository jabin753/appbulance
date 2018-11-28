var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

const workboxBuild = require('workbox-build');
//Copiado de librerías de dependencias
gulp.task('vendor', function () {
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
  //jQuery Validation
  gulp.src([
    './node_modules/jquery-validation/dist/*',
  ])
    .pipe(gulp.dest('./src/public/vendor/jquery-validation'))
  // Socket.io
  gulp.src([
    './node_modules/socket.io-client/dist/*.js'
  ])
    .pipe(gulp.dest('./src/public/vendor/socket-io'))
});

//Minificado de css

gulp.task('css:minify', function () {
  return gulp.src([
    './src/public/css/**/*.css',
    '!./src/public/css/**/*.min.css'
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./src/public/css'));
});
gulp.task('css', ['css:minify']);

//Minificado de js

gulp.task('js:minify', function () {
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

gulp.task('build', ['css', 'js', 'vendor','sw']);

//Service Worker
gulp.task('sw', () => {
  // Pass Manually:
  //  workbox.setConfig({ debug: false })
  return workboxBuild.generateSW({
    globDirectory: '/src/public/vendor',//Nothing here <--
    swDest: 'src/public/sw.js',
    runtimeCaching: [{
      urlPattern: new RegExp('/vendor/.*\.js'),
      handler: 'networkFirst',
      options: {
        cacheName: 'js-vendor',
      }
    },
    {
      urlPattern: /.*\.css/,
      handler: 'networkFirst',
      options: {
        cacheName: 'css-cache',
      }
    },
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
      handler: 'cacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }
      }
    }]

  });
});

//Servidor para desarrollo

gulp.task('dev', ['vendor'], function (done) {
  nodemon({
    script: './src/index.js'
    , ext: 'js'
    , ignore: ['./src/public', './src/views']
    , env: { 'NODE_ENV': 'development' }
    , done: done
  });
  gulp.watch('./src/public/css/**/*.css', ['css']);
  gulp.watch('./src/public/js/**/*.js', ['js']);
});