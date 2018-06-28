var gulp = require('gulp');

//Copiado de librerías de dependencias
gulp.task('vendor', function() {
    // Bootstrap
    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
        '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
      ])
      .pipe(gulp.dest('./public/vendor/bootstrap'))
    // ChartJS
    gulp.src([
        './node_modules/chart.js/dist/*.js'
      ])
      .pipe(gulp.dest('./public/vendor/chart.js'))
    // DataTables
    gulp.src([
        './node_modules/datatables.net/js/*.js',
        './node_modules/datatables.net-bs4/js/*.js',
        './node_modules/datatables.net-bs4/css/*.css'
      ])
      .pipe(gulp.dest('./public/vendor/datatables/'))
    // Font Awesome
    gulp.src([
        './node_modules/font-awesome/**/*',
        '!./node_modules/font-awesome/{less,less/*}',
        '!./node_modules/font-awesome/{scss,scss/*}',
        '!./node_modules/font-awesome/.*',
        '!./node_modules/font-awesome/*.{txt,json,md}'
      ])
      .pipe(gulp.dest('./public/vendor/font-awesome'))
    // jQuery
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
      ])
      .pipe(gulp.dest('./public/vendor/jquery'))
    // jQuery Easing
    gulp.src([
        './node_modules/jquery.easing/*.js'
      ])
      .pipe(gulp.dest('./public/vendor/jquery-easing'))
  });