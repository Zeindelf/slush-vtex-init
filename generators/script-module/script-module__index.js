
;(function() {
    'use strict';

    const _        = require('underscore.string');
    const gulp     = require('gulp');
    const template = require('gulp-template');
    const rename   = require('gulp-rename');
    const conflict = require('gulp-conflict');
    const inquirer = require('inquirer');
    const prompts  = require('./../prompts/prompts__index.js');
    const helpers  = require('./../utils/helpers.js');

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
                const modulePath             = `./src/assets/${answers.line.toLowerCase()}/js`;
                answers.moduleName           = gulp.args ? gulp.args[0] : 'default';
                answers.modulePascalCaseName = _.classify(answers.moduleName);

                gulp.src(`${__dirname}/templates/script-module__dir/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => helpers.renameFiles(file, answers)))
                    .pipe(conflict(`${modulePath}/modules/${answers.modulePascalCaseName}/`))
                    .pipe(gulp.dest(`${modulePath}/modules/${answers.modulePascalCaseName}/`));

                gulp.src(`${__dirname}/templates/script-module__file/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => helpers.renameFiles(file, answers)))
                    .pipe(conflict(`${modulePath}/`))
                    .pipe(gulp.dest(`${modulePath}/`))
                    .on('finish', () => done());
            });
    };
})();
