
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
        const fileName = [
            {
                name: 'layoutFileName',
                message: 'Nome do arquivo (ex.: main)',
            },
        ];
        const confirm = [
            {
                type: 'confirm',
                name: 'moveon',
                message: 'Criar Style Layout?',
            },
        ];

        Array.prototype.push.apply(questions, fileName);
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

                gulp.src(`${__dirname}/templates/style-layout__single-file/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => helpers.renameFiles(file, answers)))
                    .pipe(conflict(`${scssPath}/layouts/${answers.layoutName}/`))
                    .pipe(gulp.dest(`${scssPath}/layouts/${answers.layoutName}/`))
                    .on('finish', () => done());
            });
    };
})();
