
import CacheSelectors from './__cache-selectors.js';

const El = CacheSelectors.<%= moduleName %>;
const Methods = {
    init() {
        Methods.<%= moduleFileName %>();
    },

    <%= moduleFileName %>() {},
};

export default {
    init: Methods.init,
};
