
import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.header;
const Methods = {
    init() {
        Methods.headerMenu();
    },

    headerMenu() {
        El.menu.hide();
    },
};

export default {
    init: Methods.init,
};
