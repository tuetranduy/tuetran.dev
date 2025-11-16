const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

// Paths configuration
const paths = {
  html: {
    src: '*.html',
    dest: 'dist/'
  },
  css: {
    src: 'assets/css/**/*.css',
    dest: 'dist/assets/css/'
  },
  js: {
    src: 'assets/js/**/*.js',
    dest: 'dist/assets/js/'
  },
  images: {
    src: 'assets/img/**/*',
    dest: 'dist/assets/img/'
  },
  vendor: {
    src: 'assets/vendor/**/*',
    dest: 'dist/assets/vendor/'
  },
  forms: {
    src: 'forms/**/*',
    dest: 'dist/forms/'
  },
  scss: {
    src: 'assets/scss/**/*',
    dest: 'dist/assets/scss/'
  }
};

// Task: Minify CSS
function minifyCSS() {
  return gulp.src(paths.css.src)
    .pipe(cleanCSS({ 
      compatibility: 'ie8',
      level: 2 
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.css.dest));
}

// Task: Minify JavaScript
function minifyJS() {
  return gulp.src(paths.js.src)
    .pipe(terser({
      compress: {
        drop_console: false
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js.dest));
}

// Task: Optimize Images (copy with potential for future optimization)
// Note: For true image compression, consider using imagemin-cli separately
// or a different solution due to security concerns with older packages
function optimizeImages() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

// Task: Copy vendor files (already minified)
function copyVendor() {
  return gulp.src(paths.vendor.src)
    .pipe(gulp.dest(paths.vendor.dest));
}

// Task: Copy forms directory
function copyForms() {
  return gulp.src(paths.forms.src)
    .pipe(gulp.dest(paths.forms.dest));
}

// Task: Copy SCSS files (optional, for reference)
function copySCSS() {
  return gulp.src(paths.scss.src)
    .pipe(gulp.dest(paths.scss.dest));
}

// Task: Process HTML files - update asset references and minify
async function processHTML() {
  const htmlFiles = ['index.html', 'portfolio-details.html', 'service-details.html', 'starter-page.html'];
  
  for (const file of htmlFiles) {
    const filePath = path.join(__dirname, file);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace CSS references to point to minified versions
      content = content.replace(/assets\/css\/main\.css/g, 'assets/css/main.min.css');
      
      // Replace JS references to point to minified versions
      content = content.replace(/assets\/js\/main\.js/g, 'assets/js/main.min.js');
      
      // Minify HTML
      const minifiedContent = await minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: false,
        keepClosingSlash: true
      });
      
      // Write to dist folder
      const destPath = path.join(__dirname, 'dist', file);
      fs.writeFileSync(destPath, minifiedContent, 'utf8');
      console.log(`Processed and minified: ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  
  return Promise.resolve();
}

// Task: Create dist directory if it doesn't exist
function createDistDir(cb) {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  cb();
}

// Default task: run all tasks
const build = gulp.series(
  createDistDir,
  gulp.parallel(
    minifyCSS,
    minifyJS,
    optimizeImages,
    copyVendor,
    copyForms,
    copySCSS
  ),
  processHTML
);

// Watch task for development
function watchFiles() {
  gulp.watch(paths.css.src, minifyCSS);
  gulp.watch(paths.js.src, minifyJS);
  gulp.watch(paths.html.src, processHTML);
  gulp.watch(paths.images.src, optimizeImages);
}

// Export tasks
exports.css = minifyCSS;
exports.js = minifyJS;
exports.images = optimizeImages;
exports.html = processHTML;
exports.vendor = copyVendor;
exports.watch = watchFiles;
exports.build = build;
exports.default = build;
