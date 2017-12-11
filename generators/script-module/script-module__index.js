
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
                message: 'Criar Módulo?',
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
                answers.moduleName           = gulp.args ? gulp.args[0] : 'default';
                answers.modulePascalCaseName = _.classify(answers.moduleName);

                gulp.src(`${__dirname}/templates/**`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename((file) => {
                        // msn: module slug name
                        if ( file.basename.indexOf('%msn%') > -1 ) {
                            file.basename = file.basename.replace('%msn%', answers.moduleName);
                        }

                        // mpcn: module pascal case name
                        if ( file.basename.indexOf('%mpcn%') > -1 ) {
                            file.basename = file.basename.replace('%mpcn%', answers.modulePascalCaseName);
                        }
                    }))
                    .pipe(gulp.dest(`./src/assets/${answers.line.toLowerCase()}/js/modules/${answers.modulePascalCaseName}/`))
                    .on('finish', () => done());
            });
    };
})();
