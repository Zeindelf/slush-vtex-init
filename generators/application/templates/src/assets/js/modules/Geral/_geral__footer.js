
import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.footer;
const Methods = {
    init() {
        Methods.footerMenu();
    },

    footerMenu() {
        El.menu.hide();
    },
};

export default {
    init: Methods.init,
};
