
;(function() {
    'use strict';

    module.exports = {
        questions: [
            {
                name: 'developerName',
                message: 'Nome do desenvolvedor/agência: (ex.: zeindelf)',
                default: 'zeindelf',
            },
            {
                name: 'storeName',
                message: 'Nome da loja: (ex.: store-name)',
                default: 'store-name',
            },
        ],
        deviceList: [
            {
                type: 'rawlist',
                message: 'Criar para qual device?',
                name: 'line',
                choices: [
                    'Commom',
                    'Desktop',
                    'Mobile',
                ],
            },
        ],
    };
})();
