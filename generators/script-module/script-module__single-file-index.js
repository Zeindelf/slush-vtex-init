
;(function() {
    'use strict';

    const _        = require('underscore.string');
    const gulp     = require('gulp');
    const template = require('gulp-template');
    const rename   = require('gulp-rename');
    const inquirer = require('inquirer');
    const prompts  = require('./../prompts/prompts__index.js');
    const helpers  = require('./../utils/helpers.js');

    module.exports = function(done) {
        const questions = [];
        const fileName = [
            {
                name: 'moduleFileName',
                message: 'Nome do arquivo (ex.: main)',
            },
        ];
        const confirm = [
            {
                type: 'confirm',
                name: 'moveon',
                message: 'Criar Script Module?',
            },
        ];

        Array.prototype.push.apply(questions, prompts.questions);
        Array.prototype.push.apply(questions, fileName);
        Array.prototype.push.apply(questions, prompts.deviceList);
        Array.prototype.push.apply(questions, confirm);

        inquirer.prompt(questions)
            .then((answers) => {
                if ( ! answers.moveon ) {
                    return done();
                }

                // Set variables
                const modulePath = `./src/assets/${answers.line.toLowerCase()}/js`;
                answers.moduleName           = gulp.args ? gulp.args[0] : 'default';
                answers.modulePascalCaseName = _.classify(answers.moduleName);

                gulp.src(`${__dirname}/templates/script-module__single-file/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => helpers.renameFiles(file, answers)))
                    .pipe(gulp.dest(`${modulePath}/modules/${answers.modulePascalCaseName}/`))
                    .on('finish', () => done());
            });
    };
})();
