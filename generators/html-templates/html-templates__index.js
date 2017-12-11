
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
                message: 'Criar Template?',
            },
        ];

        Array.prototype.push.apply(prompts, defaultQuestions.questions);
        Array.prototype.push.apply(prompts, defaultQuestions.deviceList);
        Array.prototype.push.apply(prompts, confirm);

        inquirer.prompt(prompts)
            .then((answers) => {
                if ( ! answers.moveon ) {
                    return done();
                }

                // Set variables
                answers.templateName            = gulp.args ? gulp.args[0] : 'Default';
                answers.templatePascalCaseName  = _.classify(answers.templateName);
                answers.developerPascalCaseName = _.classify(answers.developerName);
                answers.storePascalCaseName     = _.classify(answers.storeName);

                gulp.src(`${__dirname}/templates/${answers.line.toLowerCase()}-template.html`)
                    .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                    .pipe(rename(`${answers.developerPascalCaseName}-${answers.templatePascalCaseName}-${answers.storePascalCaseName}-${_.capitalize(answers.line)}.html`))
                    .pipe(gulp.dest(`./views/${answers.line.toLowerCase()}/html-templates/`))
                    .on('finish', () => done());
            });
    }
})();
