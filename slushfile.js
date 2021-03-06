/*
 * slush-vtex-init
 * https://github.com/zeindelf/slush-vtex-init
 *
 * Copyright (c) 2017, Wellington Barreto
 * Licensed under the MIT license.
 */

'use strict';

const gulp = require('gulp');

// Default Task
gulp.task('default', require('./generators/application/application__index.js'));

// Generators Tasks
gulp.task('html-template', require('./generators/html-templates/html-templates__index.js'));
gulp.task('script-module', require('./generators/script-module/script-module__index.js'));
gulp.task('style-layout', require('./generators/style-layout/style-layout__index.js'));

// Generators Single Files Task
gulp.task('single-script-module', require('./generators/script-module/script-module__single-file-index.js'));
gulp.task('single-style-layout', require('./generators/style-layout/style-layout__single-file-index.js'));

// Generator Sublayouts
gulp.task('sublayout-style-layout', require('./generators/style-layout/style-layout__sublayout.js'));
