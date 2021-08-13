const   babelify = require('babelify'),
        browserify = require('browserify'),
        gulp = require('gulp'),
        htmlPartial = require('gulp-html-partial'),
        del = require('del'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        autoprefixer = require('gulp-autoprefixer'),
        sourcemaps = require('gulp-sourcemaps'),
        babel = require('gulp-babel'),
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        htmlmin = require('gulp-htmlmin'),
        nodemon = require('gulp-nodemon'),
        rename = require('gulp-rename'),
        image = require('gulp-image'),
        uglify = require('gulp-uglify');
    

gulp.task('html', function () {
    return gulp.src('src/html/*.html')
    .pipe(htmlPartial({
        basePath: 'src/html/partials/'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('server/build/'));
})

// Second Task - Export Clean and Minify Css TASK
gulp.task('css', function () {
    return gulp.src([
            'src/css/**/*.css',
            'src/css/**/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('.')) //(.) mean at the sam epath
        .pipe(gulp.dest('server/build/css')) // collect all in the dist file
        // .pipe(livereload())
})



gulp.task('optimizeImage',async function () {
    gulp.src('src/imgs/*')
      .pipe(image())
      .pipe(gulp.dest('server/build/imgs'));
  });


gulp.task('copyFonts',function(){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('server/build/fonts'));
})

gulp.task('copyVideos',function(){
    return gulp.src('src/videos/*')
        .pipe(gulp.dest('server/build/videos'));
})


gulp.task('copyAwesome',function(){
    return gulp.src('src/webfonts/**/*')
      .pipe(gulp.dest('server/build/webFonts'));
})





// gulp.task('reloadServer',()=>{
//     nodemon({
//         runOnChangeOnly:true
//     })
// })


const jsSRC = 'app.js';
const jsFolder = 'src/js/';
const jsFiles = [jsSRC];
gulp.task('js',function(done){
    jsFiles.map(function(entery){
        return browserify({
            entries:[jsFolder + entery],
            debug:true
        })
        .transform(babelify,{'presets':['env']})
        .bundle()
        .pipe(source(entery))
        .pipe(rename({'extname':'.min.js'}))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify())
        .pipe(sourcemaps.write( './' ) )
        .pipe(gulp.dest('server/build/js'))
    })
    done()
})





gulp.task('server', function (done) {
    nodemon({
      script: './server/server.js'
    , ext: 'js html css image ttf'
    , env: { 'NODE_ENV': 'development' }
    , done: done
    })
  })


// to remove build folder
function clean(cb) {
    del(['docs', 'coverage', 'build', 'release']);
    cb();
}
gulp.task('clean', gulp.series(clean));
gulp.task('online-build', gulp.series('html', 'css', 'optimizeImage','copyFonts','copyVideos','copyAwesome','js'));
gulp.task('local-build', gulp.series('html', 'css', 'optimizeImage','copyFonts','copyVideos','copyAwesome','js','server'));


gulp.task('watch', function () {
    gulp.watch('src/html/**/*.html',gulp.series('html'))
    gulp.watch(['src/css/**/*.css', 'src/css/**/*.scss'], gulp.series('css'))
    gulp.watch('src/imgs/**/*', gulp.series('optimizeImage'));
    gulp.watch('src/fonts/**/*', gulp.series('copyFonts'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/videos/**/*', gulp.series('copyVideos'));

});
