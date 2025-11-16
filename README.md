# tuetran.dev

A personal portfolio website built with Bootstrap, optimized for performance using an automated Gulp build process.

## Build Process

This project uses Gulp to optimize assets for production deployment. The build process includes:

- **CSS Minification**: Reduces CSS file size by ~31%
- **JavaScript Minification**: Reduces JS file size by ~47%
- **HTML Minification**: Reduces HTML file size by ~26%
- **Image Optimization**: Copies optimized images to distribution folder
- **Asset Reference Updates**: Automatically updates HTML to reference minified assets

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tuetranduy/tuetran.dev.git
cd tuetran.dev
```

2. Install dependencies:
```bash
npm install
```

### Building for Production

Run the build process to create optimized assets:

```bash
npm run build
```

This will:
1. Create a `dist/` directory
2. Minify all CSS files (output: `dist/assets/css/main.min.css`)
3. Minify all JavaScript files (output: `dist/assets/js/main.min.js`)
4. Optimize and copy images to `dist/assets/img/`
5. Copy vendor libraries to `dist/assets/vendor/`
6. Process and minify HTML files with updated asset references
7. Copy forms directory to `dist/forms/`

### Development Mode

To watch for changes and automatically rebuild:

```bash
npm run watch
```

## Project Structure

```
tuetran.dev/
├── assets/
│   ├── css/          # Source CSS files
│   ├── js/           # Source JavaScript files
│   ├── img/          # Image assets
│   ├── scss/         # SCSS source files
│   └── vendor/       # Third-party libraries
├── forms/            # Contact form scripts
├── dist/             # Production-ready files (generated)
├── gulpfile.js       # Gulp build configuration
├── package.json      # npm dependencies and scripts
└── *.html            # HTML pages

```

## Deployment

After running the build process, deploy the contents of the `dist/` folder to your web server or hosting platform. The `dist/` folder contains all optimized assets ready for production use.

## Template Information

- **Template Name**: MyResume
- **Template URL**: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
- **Author**: BootstrapMade.com
- **License**: https://bootstrapmade.com/license/

## Performance Improvements

The Gulp build process achieves significant file size reductions:
- CSS: ~31% smaller
- JavaScript: ~47% smaller
- HTML: ~26% smaller

These optimizations result in faster page load times and improved user experience.

## License

See LICENSE file for details.
