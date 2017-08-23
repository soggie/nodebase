require('babel-polyfill')
const gulp = require('gulp')
const babel = require('gulp-babel')
const mocha = require('gulp-mocha')
const standard = require('gulp-standard')

const DIR_DIST = 'dist'
const DIR_SRC = 'src/**/*.js'
const DIR_TEST = 'dist/test/**/*.js'
const MOCHA_TIMEOUT = 200000
const BABEL_BACKEND_PRESET = {
  presets: [
    ['env', {
      node: 'current',
    }]
  ]
}

gulp.task('standard', () =>
  gulp.src(DIR_SRC)
    .pipe(standard())
    .pipe(standard.reporter('default', {}))
)

gulp.task('build', () => 
  gulp.src(DIR_SRC)
    .pipe(babel(BABEL_BACKEND_PRESET))
    .pipe(gulp.dest(DIR_DIST))
)

gulp.task('test', ['build'], () => 
  gulp.src(DIR_TEST)
    .pipe(mocha({ timeout: MOCHA_TIMEOUT }))
    .once('error', () => process.exit(1))
    .once('end', () => process.exit())
)

gulp.task('default', ['standard', 'build'])