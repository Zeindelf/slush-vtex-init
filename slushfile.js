/*
 * slush-vtex-init
 * https://github.com/zeindelf/slush-vtex-init
 *
 * Copyright (c) 2017, Wellington Barreto
 * Licensed under the MIT license.
 */

'use strict';

const gulp     = require('gulp');
const install  = require('gulp-install');
const conflict = require('gulp-conflict');
const template = require('gulp-template');
const rename   = require('gulp-rename');
const inquirer = require('inquirer');
const _        = require('underscore.string');

gulp.task('default', (done) => {
    const prompts = [
        {
            name: 'appName',
            message: 'Nome da aplicação em formato slug (ex.: vtex-init)',
            default: 'vtex-init',
        },
        {
            name: 'appVersion',
            message: 'Número da versão da aplicação',
            default: '0.0.1',
        },
        {
            name: 'developerName',
            message: 'Nome do desenvolvedor/agência (ex.: zeindelf)',
            default: 'zeindelf',
        },
        {
            name: 'storeSlugName',
            message: 'Nome da loja em formato slug (ex.: store-name)',
            default: 'store-name',
        },
        {
            name: 'storePascalCaseName',
            message: 'Nome da loja para Templates da Vtex em PascalCase (ex.: StoreName)',
            default: 'StoreName',
        },
        {
            type: 'confirm',
            name: 'moveon',
            message: 'Criar Vtex Boilerplate?'
        },
    ];

    inquirer
        .prompt(prompts)
        .then((answers) => {
            if ( ! answers.moveon ) {
                return done();
            }

            // Set variables
            answers.developerPascalCaseName = _.capitalize(answers.developerName);
            answers.developerSlugName = answers.developerName.toLowerCase();

            gulp.src(`${__dirname}/templates/**`)
                .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
                .pipe(rename((file) => {
                    if ( file.basename[0] === '@' ) {
                        file.basename = '.' + file.basename.slice(1);
                    }

                    // dsn: developer slug name
                    if ( file.basename.indexOf('%dsn%') > -1 ) {
                        file.basename = file.basename.replace('%dsn%', answers.developerSlugName);
                    }

                    // ssn: store slug name
                    if ( file.basename.indexOf('%ssn%') > -1 ) {
                        file.basename = file.basename.replace('%ssn%', answers.storeSlugName);
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

gulp.task('template', (done) => {
    const templateName = gulp.args ? gulp.args[0] : 'Default';

    gulp.src(__dirname + '/templates/views/desktop/html-templates/%dpcn%-Home-%spcn%-Desktop.html')
        .pipe(template({name: templateName}))
        .pipe(rename(`%dpcn%-${templateName}-%spcn%-Desktop.html`))
        .pipe(gulp.dest('./'))
        .on('finish', () => done());
});
