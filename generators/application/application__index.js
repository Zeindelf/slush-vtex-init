
;(function() {
    'use strict';

    const _        = require('underscore.string');
    const gulp     = require('gulp');
    const install  = require('gulp-install');
    const conflict = require('gulp-conflict');
    const template = require('gulp-template');
    const rename   = require('gulp-rename');
    const inquirer = require('inquirer');
    const prompts  = require('./../prompts/prompts__index.js');
    const helpers    = require('./../utils/helpers.js');

    module.exports = function(done) {
        const questions = [
            {
                name: 'appName',
                message: 'Nome da aplicação: (ex.: vtex-init)',
                default: 'vtex-init',
            },
            {
                name: 'appVersion',
                message: 'Número da versão da aplicação:',
                default: '0.0.1',
            },
        ];
        const confirm = [
            {
                type: 'confirm',
                name: 'moveon',
                message: 'Criar Vtex Boilerplate?',
            },
        ];

        Array.prototype.push.apply(questions, prompts.questions);
        Array.prototype.push.apply(questions, confirm);

        inquirer.prompt(questions)
            .then((answers) => {
                if ( ! answers.moveon ) {
                    return done();
                }

                // Set variables
                answers.developerPascalCaseName = _.classify(answers.developerName);
                answers.storePascalCaseName     = _.classify(answers.storeName);

                gulp.src(`${__dirname}/templates/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => {
                        if ( file.basename[0] === '@' ) {
                            file.basename = '.' + file.basename.slice(1);
                        }

                        helpers.renameFiles(file, answers);
                    }))
                    .pipe(conflict('./'))
                    .pipe(gulp.dest('./'))
                    .pipe(install())
                    .on('end', () => done());
            });
        };
})();
