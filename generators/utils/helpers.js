(function() {
    'use strict';

    module.exports = {
        renameFiles(file, answers) {
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

            // msn: module slug name
            if ( file.basename.indexOf('%msn%') > -1 ) {
                file.basename = file.basename.replace('%msn%', answers.moduleName);
            }

            // mpcn: module pascal case name
            if ( file.basename.indexOf('%mpcn%') > -1 ) {
                file.basename = file.basename.replace('%mpcn%', answers.modulePascalCaseName);
            }

            // lsn: layout slug name
            if ( file.basename.indexOf('%lsn%') > -1 ) {
                file.basename = file.basename.replace('%lsn%', answers.layoutName);
            }

            // %device%: device
            if ( file.basename.indexOf('%device%') > -1 ) {
                file.basename = file.basename.replace('%device%', answers.line.toLowerCase());
            }
        },
    };
})();
