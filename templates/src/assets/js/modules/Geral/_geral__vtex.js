
import CacheSelectors from './__cache-selectors';

const El = CacheSelectors.vtex;
const Methods = {
    init() {
        Methods.helperComplement();
    },

    helperComplement() {
        El.helperComplement.remove();

        $(document).on('ajaxStop', () => {
            El.helperComplement.remove();
        });
    },
};

export default {
    init: Methods.init,
};
