
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
                message: 'Criar Script Module?',
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
                const modulePath = `./src/assets/${answers.line.toLowerCase()}/js/modules`;
                answers.moduleName           = gulp.args ? gulp.args[0] : 'default';
                answers.modulePascalCaseName = _.classify(answers.moduleName);

                gulp.src(`${__dirname}/templates/script-module__dir/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => renameFiles(file, answers)))
                    .pipe(gulp.dest(`${modulePath}/${answers.modulePascalCaseName}/`));

                gulp.src(`${__dirname}/templates/script-module__file/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => renameFiles(file, answers)))
                    .pipe(gulp.dest(`${modulePath}/`))
                    .on('finish', () => done());
            });
    };
})();

function renameFiles(file, answers) {
    // msn: module slug name
    if ( file.basename.indexOf('%msn%') > -1 ) {
        file.basename = file.basename.replace('%msn%', answers.moduleName);
    }

    // mpcn: module pascal case name
    if ( file.basename.indexOf('%mpcn%') > -1 ) {
        file.basename = file.basename.replace('%mpcn%', answers.modulePascalCaseName);
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
