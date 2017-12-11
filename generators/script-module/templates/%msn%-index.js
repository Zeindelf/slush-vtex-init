
import <%= modulePascalCaseName %>Main from './_<%= moduleName %>__main.js';

const init = () => {
    <%= modulePascalCaseName %>Main.init();
};

export default {
    init: init,
};
