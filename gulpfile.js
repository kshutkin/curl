var gulp = require('gulp'),
    closureCompiler = require('google-closure-compiler').gulp(),
    del = require('del'),
    notify = require('gulp-notify'),
    size = require('gulp-size'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence').use(gulp);

var onError = function(err) {
    notify.onError({
        title:    'Gulp',
        subtitle: 'Failure!',
        message:  'Error: <%= error.message %>',
        sound:    'Beep'
    })(err);

    this.emit('end');
};

gulp.task('clean', function(cb) {
    del(['dist/**', '!dist', '!dist/README.md'], cb);
});

gulp.task('curl', function() {
    return gulp.src(['src/curl.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('curl.js'))
        .pipe(size({title:'curl before minification'}))
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            js_output_file: 'curl.js'
        }))
        .pipe(size({title:'curl after minification'}))
        .pipe(gulp.dest('dist/curl/'));
});

gulp.task('curl-debug', function() {
    return gulp.src(['src/curl.js', 'src/curl/debug.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('curl.js'))
        .pipe(size({title:'curl-debug'}))
        .pipe(gulp.dest('dist/debug/'));
});

gulp.task('curl-with-js-and-domReady', function() {
    return gulp.src(['src/curl.js', 'src/curl/domReady.js', 'src/curl/plugin/js.js' ,'src/curl/plugin/domReady.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('curl.js'))
        .pipe(size({title:'curl-with-js-and-domReady before minification'}))
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            js_output_file: 'curl.js'
        }))
        .pipe(size({title:'curl-with-js-and-domReady after minification'}))
        .pipe(gulp.dest('dist/curl-with-js-and-domReady/'));
});

gulp.task('curl-for-dojo1.6', function() {
    return gulp.src(['src/curl.js', 'src/curl/domReady.js', 'src/curl/shim/dojo16.js' ,'src/curl/plugin/domReady.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('curl.js'))
        .pipe(size({title:'curl-for-dojo1.6 before minification'}))
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            js_output_file: 'curl.js'
        }))
        .pipe(size({title:'curl-for-dojo1.6 after minification'}))
        .pipe(gulp.dest('dist/curl-for-dojo1.6/'));
});

gulp.task('curl-for-dojo1.8', function() {
    return gulp.src(['src/curl.js', 'src/curl/domReady.js', 'src/curl/shim/dojo18.js' ,'src/curl/plugin/domReady.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('curl.js'))
        .pipe(size({title:'curl-for-dojo1.8 before minification'}))
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            js_output_file: 'curl.js'
        }))
        .pipe(size({title:'curl-for-dojo1.8 after minification'}))
        .pipe(gulp.dest('dist/curl-for-dojo1.8/'));
});

gulp.task('curl-kitchen-sink', function() {
    return gulp.src(['src/curl.js', 'src/curl/domReady.js', 'src/curl/shim/dojo18.js' ,'src/curl/plugin/js.js', 'src/curl/plugin/_fetchText.js', 'src/curl/plugin/text.js', 'src/curl/plugin/async.js', 'src/curl/plugin/css.js', 'src/curl/plugin/link.js', 'src/curl/plugin/json.js', 'src/curl/plugin/domReady.js', 'src/curl/shim/_fetchText.js', 'src/curl/shim/ssjs.js', 'src/curl/loader/cjsm11.js', 'src/curl/plugin/locale.js', 'src/curl/plugin/i18n.js', 'src/curl/loader/legacy.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('curl.js'))
        .pipe(size({title:'curl-kitchen-sink before minification'}))
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            js_output_file: 'curl.js'
        }))
        .pipe(size({title:'curl-kitchen-sink after minification'}))
        .pipe(gulp.dest('dist/curl-kitchen-sink/'));
});

gulp.task('curl-for-jQuery', function() {
    return gulp.src(['src/curl.js', 'src/curl/domReady.js', 'src/curl/plugin/js.js', 'src/curl/plugin/link.js', 'src/curl/plugin/domReady.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('curl.js'))
        .pipe(size({title:'curl-for-jQuery before minification'}))
        .pipe(closureCompiler({
            compilation_level: 'ADVANCED',
            js_output_file: 'curl.js'
        }))
        .pipe(size({title:'curl-for-jQuery after minification'}))
        .pipe(gulp.dest('dist/curl-for-jQuery/'));
});

gulp.task('curl-for-ssjs', function() {
    return gulp.src(['src/curl.js', 'src/curl/plugin/_fetchText.js', 'src/curl/shim/_fetchText.js', 'src/curl/shim/ssjs.js', 'src/curl/loader/cjsm11.js'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(concat('curl.js'))
        .pipe(size({title:'curl-for-ssjs'}))
        .pipe(gulp.dest('dist/curl-for-ssjs/'));
});


gulp.task('default', function(callback) {
    runSequence(['clean'], [
        'curl',
        'curl-debug',
        'curl-with-js-and-domReady',
        'curl-for-dojo1.6',
        'curl-for-dojo1.8',
        'curl-kitchen-sink',
        'curl-for-jQuery',
        'curl-for-ssjs'
    ], callback);
});