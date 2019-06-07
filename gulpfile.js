const { src, dest, parallel, gulp } = require('gulp')
const nodemon = require('gulp-nodemon')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const workboxBuild = require('workbox-build')

function bootstrap(){
  return src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
  ])
  .pipe(dest('./src/public/vendor/bootstrap'))
}

function chartJs(){
  return src([
    './node_modules/chart.js/dist/*.js'
  ])
  .pipe(dest('./src/public/vendor/chart.js'))
}

function datatable(){
  return src([
    './node_modules/datatables.net/js/*.js',
    './node_modules/datatables.net-dt/js/*.js',
    './node_modules/datatables.net-buttons/js/*.js',
    './node_modules/datatables.net-dt/css/*.css',
    './node_modules/datatables.net-select/js/*.js'
  ])
  .pipe(dest('./src/public/vendor/datatables/'))
}

function datatableimg(){
  return src([
    './node_modules/datatables.net-dt/images/*.png'
  ])
  .pipe(dest('./src/public/vendor/images/'))
}

function fontAwesome(){
  return src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
  ])
  .pipe(dest('./src/public/vendor/font-awesome'))
}

function jQuery(){
  return src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
  .pipe(dest('./src/public/vendor/jquery'))
}

function jQueryEasing(){
  return src([
    './node_modules/jquery.easing/*.js'
  ])
  .pipe(dest('./src/public/vendor/jquery-easing'))
}

function jQueryValidation(){
  return src([
    './node_modules/jquery-validation/dist/*'
  ])
  .pipe(dest('./src/public/vendor/jquery-validation'))
}

function pushJs(){
  return src([
    './node_modules/push.js/bin/*'
  ])
  .pipe(dest('./src/public/vendor/pushjs'))
}

function socketIO(){
  return src([
    './node_modules/socket.io-client/dist/*.js'
  ])
  .pipe(dest('./src/public/vendor/socket-io'))
}

function sweetAlert2(){
  return src([
    './node_modules/sweetalert2/dist/*'
  ])
  .pipe(dest('./src/public/vendor/sweetalert2'))
}

function vendor(){
  
}

// Minificado de JS
function jsMinify(){
  return src([
    './src/public/js/**/*.js',
    '!./src/public/js/**/*.min.js'
  ])
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(dest('./src/public/js'))
}

// Minificado de CSS
function cssMinify(){
  return src([
    './src/public/css/**/*.css',
    '!./src/public/css/**/*.min.css'
  ])
  .pipe(cleanCSS())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(dest('./src/public/css'))
}

// Service Worker
function sw(){
  // Pass Manually:
  //  workbox.setConfig({ debug: false })
  return workboxBuild.generateSW({
    globDirectory: '/src/public/vendor', // Nothing here <--
    swDest: 'src/public/sw.js',
    runtimeCaching: [{
      urlPattern: new RegExp('/vendor/.*\.js'),
      handler: 'networkFirst',
      options: {
        cacheName: 'js-vendor'
      }
    },
    {
      urlPattern: /.*\.css/,
      handler: 'networkFirst',
      options: {
        cacheName: 'css-cache'
      }
    },
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
      handler: 'cacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60
        }
      }
    }]
  })
}


exports.default = parallel(jsMinify, cssMinify, parallel(bootstrap, 
  chartJs, 
  datatable, 
  datatableimg,
  fontAwesome, 
  jQuery, 
  jQueryEasing, 
  jQueryValidation, 
  pushJs, 
  socketIO, 
  sweetAlert2), sw);


  function dev(done) {
    nodemon({
      exec: 'babel-node src/index.js',
      ext: 'js',
      ignore: ['./src/public', './src/views'],
      env: { 'NODE_ENV': 'development' },
      done: done
    })
    gulp.watch('./src/public/css/**/*.css', ['cssMinify'])
    gulp.watch('./src/public/js/**/*.js', ['jsMinify'])
  }

  exports.dev = dev;