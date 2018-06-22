"use strict";

var gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    cssbeautify = require("gulp-cssbeautify"),
    removeComments = require('gulp-strip-css-comments'),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    rigger = require("gulp-rigger"),
    uglify = require("gulp-uglify"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    imagemin = require("gulp-imagemin"),
    run = require("run-sequence"),
    rimraf = require("rimraf"),
    webserver = require("browser-sync");



/* Paths to source/build/watch files
=========================*/

var path = {
    build: {
        html: "build/",
        mail: "build/",
        js: "build/assets/js/",
        css: "build/assets/css/",
        img: "build/assets/img/",
        fonts: "build/assets/fonts/"
    },
    src: {
        html: "src/*.{htm,html}",
		mail: "src/*.php",
        js: "src/assets/js/*.js",
        css: "src/assets/sass/style.scss",
        img: "src/assets/img/**/*.*",
        fonts: "src/assets/fonts/**/*.*"
    },
    watch: {
        html: "src/**/*.{htm,html}",
		php: "src/*.php",
        js: "src/assets/js/**/*.js",
        css: "src/assets/sass/**/*.scss",
        img: "src/assets/img/**/*.*",
        fonts: "src/assets/fonts/**/*.*"
    },
    clean: {
        build: "./build", 
        docs: "./docs"
    }
};



/* Webserver config
=========================*/

var config = {
    server: "build/",
    notify: false,
    open: true,
    ui: false
};



/* Tasks
=========================*/

gulp.task("webserver", function () {
    webserver(config);
});


gulp.task("html:build", function () {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(webserver.reload({stream: true}));
});

gulp.task("mail:build", function() {
    gulp.src(path.src.mail)
        .pipe(gulp.dest(path.build.mail));
});


gulp.task("css:build", function () {
    gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 5 versions"],
            cascade: true
        }))
        .pipe(removeComments())
        .pipe(cssbeautify())
        .pipe(gulp.dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({stream: true}));
});


gulp.task("js:build", function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(rigger())
        // .pipe(rename("main.js"))
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(removeComments())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({stream: true}));
});


gulp.task("fonts:build", function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});


gulp.task("image:build", function () {
    gulp.src(path.src.img)
        // .pipe(imagemin([
        //     imagemin.gifsicle({interlaced: true}),
        //     imagemin.jpegtran({progressive: true}),
        //     imagemin.optipng({optimizationLevel: 5}),
        //     imagemin.svgo({
        //         plugins: [
        //            {removeViewBox: true},
        //            {cleanupIDs: false}
        //              ]
        //          })
        //     ]))
        .pipe(gulp.dest(path.build.img));
});


gulp.task("clean:build", function (cb) {
    rimraf(path.clean.build, cb);
});

gulp.task("clean:docs", function (cb) {
    rimraf(path.clean.docs, cb);
});

gulp.task("docs", ["clean:docs"], function () {
    gulp.src('./build/**/*.*', { base: './build'}).pipe(gulp.dest('docs'));
});


gulp.task('build', function (cb) {
    run(
        "clean:build",
        "html:build",
        "mail:build",
        "css:build",
        "js:build",
        "fonts:build",
        "image:build",
        "docs"
        // "docs"
    , cb);
});





gulp.task("watch", function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start("html:build");
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start("css:build");
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start("js:build");
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start("image:build");
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start("fonts:build");
    });
});


gulp.task("default", function (cb) {
   run(
       "clean:build",
       "build",
       "docs",
       "webserver",
       "watch"
   , cb);
});
