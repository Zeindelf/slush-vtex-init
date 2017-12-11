
;(function() {
    'use strict';

    const _        = require('underscore.string');
    const gulp     = require('gulp');
    const template = require('gulp-template');
    const rename   = require('gulp-rename');
    const inquirer = require('inquirer');
    const prompts  = require('./../prompts/prompts__index.js');

    module.exports = function(done) {
        const questions = [];
        const confirm = [
            {
                type: 'confirm',
                name: 'moveon',
                message: 'Criar Style Layout?',
            },
        ];

        Array.prototype.push.apply(questions, prompts.questions);
        Array.prototype.push.apply(questions, prompts.deviceList);
        Array.prototype.push.apply(questions, confirm);

        inquirer.prompt(questions)
            .then((answers) => {
                if ( ! answers.moveon ) {
                    return done();
                }

                // Set variables
                const scssPath = `./src/assets/${answers.line.toLowerCase()}/scss`;
                answers.layoutName = gulp.args ? gulp.args[0] : 'default';

                gulp.src(`${__dirname}/templates/style-layout__dir/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => renameFiles(file, answers)))
                    .pipe(gulp.dest(`${scssPath}/layouts/${answers.layoutName}/`))

                gulp.src(`${__dirname}/templates/style-layout__file/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => renameFiles(file, answers)))
                    .pipe(gulp.dest(`${scssPath}/`))
                    .on('finish', () => done());
            });
    };
})();

function renameFiles(file, answers) {
    // lsn: layout slug name
    if ( file.basename.indexOf('%lsn%') > -1 ) {
        file.basename = file.basename.replace('%lsn%', answers.layoutName);
    }

    // dsn: developer slug name
    if ( file.basename.indexOf('%dsn%') > -1 ) {
        file.basename = file.basename.replace('%dsn%', answers.developerName);
    }

    // ssn: store slug name
    if ( file.basename.indexOf('%ssn%') > -1 ) {
        file.basename = file.basename.replace('%ssn%', answers.storeName);
    }

    // %device%: device
    if ( file.basename.indexOf('%device%') > -1 ) {
        file.basename = file.basename.replace('%device%', answers.line.toLowerCase());
    }
}
