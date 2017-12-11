
import Taskerify from 'taskerify';

Taskerify.config.sourcemaps = false;
Taskerify.config.srcPath    = './src/assets';  // Src Path
Taskerify.config.distPath   = './dist/assets'; // Dist Path

Taskerify.config.images.minCompress       = 60;      // {int} Default value
Taskerify.config.images.maxCompress       = 70;      // {int} Default value
Taskerify.config.images.optimizationLevel = 5;       // {int} Default value
Taskerify.config.images.quality           = '70-80'; // {string} Default value

const NODE_MODULES = './node_modules';
const SRC          = Taskerify.config.srcPath;
const DIST         = Taskerify.config.distPath;

const author       = '<%= developerName %>';
const storeName    = '<%= storeName %>';
const desktopFiles = ['geral', 'home'];
const mobileFiles  = ['geral', 'home'];

Taskerify( (mix) => {
    // Image Minifier
    mix.imagemin(`${SRC}/img`, `${DIST}/img-min`);

    // Main Desktop Files
    desktopFiles.map( (file) => {
        mix.browserify(`${SRC}/desktop/js/${author}-${file}-${storeName}-desktop.js`, `${DIST}/desktop/js`)
            .sass(`${SRC}/desktop/scss/${author}-${file}-${storeName}-desktop.scss`,  `${DIST}/desktop/css`);
    });

    // Main Mobile Files
    mobileFiles.map( (file) => {
        mix.browserify(`${SRC}/mobile/js/${author}-${file}-${storeName}-mobile.js`, `${DIST}/mobile/js`)
            .sass(`${SRC}/mobile/scss/${author}-${file}-${storeName}-mobile.scss`,  `${DIST}/mobile/css`);
    });

    // Commom Files
    mix.browserify(`${SRC}/commom/js/${author}-commom-${storeName}.js`, `${DIST}/commom/js`)
        .sass(`${SRC}/commom/scss/${author}-commom-${storeName}.scss`,  `${DIST}/commom/css`);

    // Javascript Linter
    mix.eslint();

    // Mix Vendor Scripts
    mix.scripts([
        `${NODE_MODULES}/lazysizes/lazysizes.js`,
        `${NODE_MODULES}/lazysizes/plugins/noscript/ls.noscript.js`,
        `${NODE_MODULES}/slick-carousel/slick/slick.js`,
    ], `${DIST}/commom/js/${author}-vendor-${storeName}.js`);
});
