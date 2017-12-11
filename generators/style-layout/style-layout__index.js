
;(function() {
    'use strict';

    const _                = require('underscore.string');
    const gulp             = require('gulp');
    const template         = require('gulp-template');
    const rename           = require('gulp-rename');
    const inquirer         = require('inquirer');
    const defaultQuestions = require('./../default-questions/default-questions__index.js');

    module.exports = function(done) {
        const prompts = [];
        const confirm = [
            {
                type: 'confirm',
                name: 'moveon',
                message: 'Criar Layout?',
            },
        ];

        Array.prototype.push.apply(prompts, defaultQuestions.deviceList);
        Array.prototype.push.apply(prompts, confirm);

        inquirer.prompt(prompts)
            .then((answers) => {
                if ( ! answers.moveon ) {
                    return done();
                }

                // Set variables
                answers.layoutName = gulp.args ? gulp.args[0] : 'default';

                gulp.src(`${__dirname}/templates/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => {
                        // lsn: layout slug name
                        if ( file.basename.indexOf('%lsn%') > -1 ) {
                            file.basename = file.basename.replace('%lsn%', answers.layoutName);
                        }
                    }))
                    .pipe(gulp.dest(`./src/assets/${answers.line.toLowerCase()}/scss/layouts/${answers.layoutName}/`))
                    .on('finish', () => done());
            });
    };
})();
