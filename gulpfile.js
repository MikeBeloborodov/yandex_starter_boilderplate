const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();

function html() {
  return gulp.src('src/**/*.html')
        .pipe(plumber())
                .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function css() {
  return gulp.src('src/blocks/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
                .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
            .pipe(gulp.dest('dist/images'))
          .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
            .pipe(gulp.dest('dist/fonts'))
          .pipe(browserSync.reload({stream: true}));
}

function videos() {
  return gulp.src('src/videos/**/*.{avi,mp4,webm}')
            .pipe(gulp.dest('dist/videos'))
          .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/fonts/**/*.{ttf,woff,woff2}'], fonts);
  gulp.watch(['src/videos/**/*.{avi,mp4,webm}'], videos);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

const build = gulp.series(clean, gulp.parallel(html, css, images, fonts, videos));
const watchapp = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.images = images; 
exports.fonts = fonts;
exports.videos = videos;
exports.clean = clean;
exports.build = build;
exports.watchFiles = watchFiles;
exports.default = watchapp;
