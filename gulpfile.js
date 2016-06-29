var gulp          = require("gulp");
var sass          = require("gulp-ruby-sass");
var haml          = require('gulp-ruby-haml');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require("gulp-autoprefixer");
var gulpFilter    = require('gulp-filter');
var plumber       = require("gulp-plumber");
var gulpkss       = require('gulp-kss');
var rename        = require("gulp-rename");
var spritesmith   = require('gulp.spritesmith');
var watch         = require('gulp-watch');
var webserver     = require('gulp-webserver');
var cssmin        = require('gulp-cssmin');
var minimage      = require("gulp-imagemin");
var uglify        = require("gulp-uglify");
var iconfont      = require('gulp-iconfont');
var consolidate   = require('gulp-consolidate');
var iconfontcss   = require('gulp-iconfont-css');
var nodemon       = require('nodemon');
var dir = {
  pro: './production/',
  dev: './develop/',
  css: 'app/assets/stylesheets/',
  icon: 'app/assets/icon/',
  fonts: 'app/assets/fonts/',
  iconfont: 'app/assets/iconfont/',
  templates: 'app/assets/templates/',
  spcss: 'app/assets/sp/stylesheets/',
  html: 'app/views/',
  sphtml: 'app/views/sp/',
  haml: 'app/views/haml/',
  sphaml: 'app/views/sp/haml/',
  img: 'app/assets/images/',
  spimg: 'app/assets/sp/images/',
  js: 'app/assets/javascripts/',
  spjs: 'app/assets/sp/javascripts/',
  sp: 'sp/',
  pcguide: './styleguide/pc/',
  spguide: './styleguide/sp/'

};
var fontName = 'originalfont';



//============================================================
//    webserver
//============================================================
gulp.task('webserver', function() {
  gulp.src(dir.dev)
    .pipe(webserver({
        host: 'localhost',
        port: 7000,
        livereload: false
    }));
});

gulp.task('webserverSP', function() {
  gulp.src(dir.dev)
    .pipe(webserver({
        host: 'localhost',
        port: 7000,
        livereload: false
    }));
});


//============================================================
//    haml build
//============================================================
gulp.task("haml", function(){
  gulp.src(dir.dev + dir.haml + "**/!(_)*.html.haml")
    .pipe(plumber())
    .pipe(haml({
      pretty: true,
      options: 'include_dirs=["./develop/app/views/shared"]'
    }))
    .pipe(rename({
      extname: ''
    }))
    .pipe(gulp.dest(dir.dev + dir.html + "/"))
});

gulp.task("hamlSP", function(){
  gulp.src(dir.dev + dir.sphaml + "**/!(_)*.haml")
    .pipe(haml({
      pretty: true,
      options: 'include_dirs=["./develop/app/views/sp/shared"]'
    }))
    .pipe(rename({
      extname: ''
    }))
    .pipe(gulp.dest(dir.dev + dir.html + "sp/"))
});


//============================================================
//    sass compile
//============================================================
gulp.task('sass', function() {
  // for pc
  return sass(dir.dev + dir.css + '*.scss', {
    sourcemap: false ,
    noCache: true ,
    style: 'expanded'
  })
  .pipe(plumber())
  .pipe(autoprefixer("last 3 version"))
  .pipe(gulp.dest(dir.dev + dir.css));
});
gulp.task('sassSP', function() {
  // for sp
  return sass(dir.dev + dir.spcss + '*.scss', {
    sourcemap: false ,
    noCache: true ,
    style: 'expanded'
  })
  .pipe(plumber())
  .pipe(autoprefixer("last 3 version"))
  .pipe(gulp.dest(dir.dev + dir.spcss));
});


//============================================================
//    coffee compile
//============================================================

gulp.task('coffee', function() {
  gulp.src(dir.dev + dir.js + "*.coffee")
  .pipe(plumber())
  .pipe(coffee())
  .pipe(gulp.dest(dir.dev + dir.js));
});

gulp.task('coffeeSP', function() {
  gulp.src(dir.dev + dir.spjs + "*.coffee")
  .pipe(plumber())
  .pipe(coffee())
  .pipe(gulp.dest(dir.dev + dir.spjs));
});

//============================================================
//      style guide PC
//============================================================

gulp.task('kssPC', function() {
  gulp.src(dir.dev + dir.css + 'elements/**.scss')
    .pipe(gulpkss({
      overview: dir.pcguide + 'styleguide.md',
      templateDirectory: dir.pcguide + 'template/'
    }))
    .pipe(gulp.dest(dir.pcguide +'app/views/'));
    return sass(dir.dev + dir.css + 'application.scss', {
      sourcemap: false ,
        style: 'expanded'
      })
      .pipe(plumber())
      .pipe(autoprefixer("last 3 version"))
    .pipe(gulp.dest(dir.pcguide +'app/views/public'));
});

//============================================================
//     style guide SP
//============================================================

gulp.task('kssSP', function() {
  gulp.src(dir.dev + dir.spcss + 'elements/**.scss')
    .pipe(gulpkss({
      overview: dir.spguide + 'styleguide.md',
      templateDirectory: dir.spguide + 'template/'
    }))
    .pipe(gulp.dest(dir.spguide +'app/views/'));
    return sass(dir.dev + dir.spcss + 'application.scss', {
      sourcemap: false ,
        style: 'expanded'
      })
      .pipe(plumber())
      .pipe(autoprefixer("last 3 version"))
    .pipe(gulp.dest(dir.spguide +'app/views/public'));
});


//============================================================
//      sprite images
//============================================================
gulp.task('sprite', function () {
  var spriteData = gulp.src(dir.dev + dir.img + 'sprites/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../images/sprite.png',
    cssFormat: 'scss',
    cssTemplate: "./gulp_resources/sprite-template.mustache",
    algorithm: 'binary-tree',
    padding:10,
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name;
    }
  }));
  spriteData.img.pipe(gulp.dest(dir.dev + dir.img));
  spriteData.css.pipe(gulp.dest(dir.dev + dir.css + 'elements/'));

  var spriteDataSP = gulp.src(dir.dev + dir.spimg + 'sprites/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.css.scss',
    imgPath: '../images/sprite.png',
    cssFormat: 'scss',
    cssTemplate: "./gulp_resources/sprite-template.mustache",
    algorithm: 'binary-tree',
    padding:10,
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name;
    }
  }));
  spriteDataSP.img.pipe(gulp.dest(dir.dev + dir.spimg ));
  spriteDataSP.css.pipe(gulp.dest(dir.dev + dir.spcss + 'elements/'));
});


//============================================================
//   min file
//============================================================
gulp.task("minimage", function() {
    gulp.src(dir.dev + dir.img + "**/*")
        .pipe(minimage())
        .pipe(gulp.dest(dir.dev + dir.img + "min/"));
});

gulp.task("minimageSP", function() {
    gulp.src(dir.dev + dir.spimg + "**/*")
        .pipe(minimage())
        .pipe(gulp.dest(dir.dev + dir.img + "min/"));
});

//============================================================
//   icon font
//============================================================
gulp.task('iconfont', function(){
  return gulp.src([dir.dev + dir.icon + "*.svg"])
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
        fontPath: '../fonts/', // set path to font (from your CSS file if relative)
        className: 's' // set class name in your CSS
      };
      gulp.src(dir.dev + dir.templates + "myfont.css")
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName }))
        .pipe(gulp.dest(dir.dev + dir.iconfont))
        .pipe(gulp.dest(dir.dev + dir.css)); // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      gulp.src(dir.dev + dir.templates + "myfont.html")
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'sample' }))
        .pipe(gulp.dest(dir.dev + dir.iconfont)); // set path to export your sample HTML
    })
    .pipe(gulp.dest(dir.dev + dir.fonts));
});


//============================================================
//  min js
//============================================================
gulp.task("min_js", function() {
  gulp.src([dir.dev + dir.js + '*.js'])
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(dir.dev + dir.js + 'min/'));
});

//============================================================
//  min sass
//============================================================

gulp.task('min_css', ['sass'], function () {
  gulp.src('./css/*.css')
    .pipe(uglify())
    .pipe(css())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/min'));
});

//============================================================
//  min image
//============================================================
gulp.task("min_image", function() {
    gulp.src("./image/*")
    .pipe(uglify())
    .pipe(image())
    .pipe(gulp.dest("./image/min"));
});


//============================================================
//  watch
//============================================================

gulp.task('watch', ['sass','sassSP'], function(){
  gulp.watch([dir.dev + dir.css + "**/*.scss"],["sass"]);
  gulp.watch([dir.dev + dir.spcss + "**/*.scss"],["sassSP"]);
  gulp.watch([dir.dev + dir.haml + "**/*.haml"], ['haml']);
  gulp.watch([dir.dev + dir.sphaml + "**/*.haml"], ['hamlSP']);
});

gulp.task('watchPC', ['sass'], function(){
  gulp.watch([dir.dev + dir.css + "**/*.scss"],['sass']);
  gulp.watch([dir.dev + dir.haml + "**/*.haml"], ['haml']);
});

gulp.task('watchSP', ['sassSP'], function(){
  gulp.watch([dir.dev + dir.spcss + "**/*.scss"],["sassSP"]);
  gulp.watch([dir.dev + dir.sphaml + "**/*.haml"], ['hamlSP']);
});


//============================================================
//  default
//============================================================

//ALL
gulp.task('default',['watch','webserver','sprite','iconfont']);

//PC
gulp.task('pc',['watchPC','webserver']);

//SP
gulp.task('sp',['hamlSP','watchSP','webserverSP']);
