
import CacheSelectors from './__cache-selectors.js';

const El = CacheSelectors.<%= moduleName %>;
const Methods = {
    init() {
        Methods.main();
    },

    main() {},
};

export default {
    init: Methods.init,
};
