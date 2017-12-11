/*
 * slush-vtex-init
 * https://github.com/zeindelf/slush-vtex-init
 *
 * Copyright (c) 2017, Wellington Barreto
 * Licensed under the MIT license.
 */

'use strict';

const _         = require('underscore.string');
const gulp      = require('gulp');
const install   = require('gulp-install');
const conflict  = require('gulp-conflict');
const template  = require('gulp-template');
const rename    = require('gulp-rename');
const inquirer  = require('inquirer');
const questions = [
    {name: 'developerName', message: 'Nome do desenvolvedor/agência (ex.: zeindelf)',  default: 'zeindelf'},
    {name: 'storeName',     message: 'Nome da loja em formato slug (ex.: store-name)', default: 'store-name'},
];
const deviceList = [{type: 'rawlist', message: 'Criar para qual device?', name: 'line', choices: ['Commom', 'Desktop', 'Mobile']}];

// Default Task
gulp.task('default', (done) => {
    const prompts = [
        {name: 'appName',    message: 'Nome da aplicação (ex.: vtex-init)', default: 'vtex-init'},
        {name: 'appVersion', message: 'Número da versão da aplicação',      default: '0.0.1'},
    ];
    const confirm = [{type: 'confirm', name: 'moveon', message: 'Criar Vtex Boilerplate?'}];

    Array.prototype.push.apply(prompts, questions);
    Array.prototype.push.apply(prompts, confirm);

    inquirer.prompt(prompts)
        .then((answers) => {
            if ( ! answers.moveon ) {
                return done();
            }

            // Set variables
            answers.developerPascalCaseName = _.classify(answers.developerName);
            answers.storePascalCaseName     = _.classify(answers.storeName);

            gulp.src(`${__dirname}/templates/app/**`)
                .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                .pipe(rename((file) => {
                    if ( file.basename[0] === '@' ) {
                        file.basename = '.' + file.basename.slice(1);
                    }

                    // dsn: developer slug name
                    if ( file.basename.indexOf('%dsn%') > -1 ) {
                        file.basename = file.basename.replace('%dsn%', answers.developerName);
                    }

                    // ssn: store slug name
                    if ( file.basename.indexOf('%ssn%') > -1 ) {
                        file.basename = file.basename.replace('%ssn%', answers.storeName);
                    }

                    // dpcn: developer pascal case name
                    if ( file.basename.indexOf('%dpcn%') > -1 ) {
                        file.basename = file.basename.replace('%dpcn%', answers.developerPascalCaseName);
                    }

                    // spcn: store pascal case name
                    if ( file.basename.indexOf('%spcn%') > -1 ) {
                        file.basename = file.basename.replace('%spcn%', answers.storePascalCaseName);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', () => done());
        });
});

// Generators Tasks
gulp.task('html-template', (done) => createHtmlTemplates(done));
gulp.task('script-module', (done) => createScriptModule(done));
gulp.task('style-layout', (done) => createStyleLayout(done));

function createHtmlTemplates(done) {
    const prompts = [];
    const confirm = [{type: 'confirm', name: 'moveon', message: 'Criar Template?'}];

    Array.prototype.push.apply(prompts, questions);
    Array.prototype.push.apply(prompts, deviceList);
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

            gulp.src(`${__dirname}/templates/defaults/html-templates/${answers.line.toLowerCase()}-template.html`)
                .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                .pipe(rename(`${answers.developerPascalCaseName}-${answers.templatePascalCaseName}-${answers.storePascalCaseName}-${_.capitalize(answers.line)}.html`))
                .pipe(gulp.dest(`./views/${answers.line.toLowerCase()}/html-templates/`))
                .on('finish', () => done());
        });
}

function createScriptModule(done) {
    const prompts = [];
    const confirm = [{type: 'confirm', name: 'moveon', message: 'Criar Módulo?'}];

    Array.prototype.push.apply(prompts, deviceList);
    Array.prototype.push.apply(prompts, confirm);

    inquirer.prompt(prompts)
        .then((answers) => {
            if ( ! answers.moveon ) {
                return done();
            }

            // Set variables
            answers.moduleName           = gulp.args ? gulp.args[0] : 'default';
            answers.modulePascalCaseName = _.classify(answers.moduleName);

            gulp.src(`${__dirname}/templates/defaults/script-module/**`)
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
}

function createStyleLayout(done) {
    const prompts = [];
    const confirm = [{type: 'confirm', name: 'moveon', message: 'Criar Layout?'}];

    Array.prototype.push.apply(prompts, deviceList);
    Array.prototype.push.apply(prompts, confirm);

    inquirer.prompt(prompts)
        .then((answers) => {
            if ( ! answers.moveon ) {
                return done();
            }

            // Set variables
            answers.layoutName = gulp.args ? gulp.args[0] : 'default';

            gulp.src(`${__dirname}/templates/defaults/style-layout/**`)
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
}
