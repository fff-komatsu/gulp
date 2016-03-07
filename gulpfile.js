var gulp         = require("gulp"),
    webserver    = require('gulp-webserver');
    sass         = require('gulp-sass');
    less         = require('gulp-less');
    autoprefixer = require("gulp-autoprefixer");
    plumber      = require("gulp-plumber");
    watch        = require('gulp-watch');
    rename       = require("gulp-rename");
    iconfont     = require('gulp-iconfont');
    consolidate  = require('gulp-consolidate');
    iconfontcss  = require('gulp-iconfont-css');
    fontName     = 'myfont'; // シンボルフォント名
    require('es6-promise').polyfill();//for autoprefixer

var fontName = 'ajikefont';

gulp.task('iconfont', function(){
  return gulp.src(['./icons/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff']
    }))
    .on('glyphs', function(glyphs) {
      var options = {
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
        }),
        fontName: fontName,
        fontPath: '../../fonts/', // set path to font (from your CSS file if relative)
        className: 's' // set class name in your CSS
      };
      gulp.src('./templates/myfont.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest('./dist/css/')); // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      gulp.src('./templates/myfont.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'sample' }))
        .pipe(gulp.dest('./dist/')); // set path to export your sample HTML
    })
    .pipe(gulp.dest('./fonts/'));
});


gulp.task('ready',function(){
    console.log('Go!!GO!!');
});


gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
        host: 'localhost',
        port: 5000,
        livereload: false
    }));
});


//============================================================
//if use sass
//============================================================
gulp.task('watch', ['sass'], function(){
    gulp.watch('./sass/*scss', ['sass']);
});

gulp.task('sass', function(){
  gulp.src('./sass/**/*scss')
  .pipe(plumber())  
  .pipe(sass())
   .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9', 'android 4'],
   }))
  .pipe(gulp.dest('./css'))
});

//============================================================
//if use less
//============================================================
// gulp.task('watch', ['less'], function(){
//     gulp.watch('./less/*less', ['sass']);
// });

// gulp.task('less',function(){
//   gulp.src('./less/**/*less')
//   .pipe(plumber())  
//   .pipe(less())
//    .pipe(autoprefixer({
//       browsers: ['last 2 versions', 'ie 9', 'android 4'],
//    }))
//   .pipe(gulp.dest('./css'))
// });



gulp.task('default', ['ready', 'webserver', 'sass', 'watch', 'iconfont']);