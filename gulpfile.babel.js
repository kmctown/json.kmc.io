import gulp from "gulp"
import del from "del"
import uglify from "gulp-uglify"
import htmlmin from "gulp-htmlmin"
import rename from "gulp-rename"
import csso from "gulp-csso"
import connect from "gulp-connect"
import runSequence from "run-sequence"

gulp.task("clean", () => {
  return del("./dist")
})

gulp.task("js", () => {
  return gulp.src("./js/main.js")
    .pipe(uglify())
    .pipe(rename("/js/main.min.js"))
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

gulp.task("vendorjs", () => {
  return gulp.src(["./js/vendor/**/*.min.js", "!./js/vendor/jquery-1.11.2.min.js"])
    .pipe(rename("/js/vendor.min.js"))
    .pipe(gulp.dest("dist"))
})

gulp.task("jquery", () => {
  return gulp.src(["./js/vendor/jquery-1.11.2.min.js"])
    .pipe(rename("/js/jquery-1.11.2.min.js"))
    .pipe(gulp.dest("dist"))
})

gulp.task("html", () => {
  return gulp.src("./index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

gulp.task("css", () => {
  return gulp.src("./css/main.css")
    .pipe(csso())
    .pipe(rename("/css/main.min.css"))
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

gulp.task("vendorcss", () => {
  return gulp.src("./css/*.min.css")
    .pipe(rename("/css/vendor.min.css"))
    .pipe(gulp.dest("dist"))
})

gulp.task("serve", ["default", "watch"], () => {
  connect.server({
    root: "dist",
    livereload: true
  })
})

gulp.task("watch", () => {
  gulp.watch(["./*.html"], ["html"]);
  gulp.watch(["./js/*.js"], ["js"]);
  gulp.watch(["./css/*.css"], ["css"]);
})

gulp.task("default", ["clean"], (cb) => {
    runSequence([
      "js",
      "vendorjs",
      "jquery",
      "html",
      "css",
      "vendorcss"
    ], cb);
})
