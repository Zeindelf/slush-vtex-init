
import CacheSelectors from './__cache-selectors.js';

const El = CacheSelectors.home;
const Methods = {
    init() {
        Methods.mainBannerSlide();
    },

    mainBannerSlide() {
        El.mainBanner.slick({
            autoplay: true,
            arrows: false,
            cssEase: 'linear',
            dots: true,
            slidesToShow: 1,
            lazyLoad: 'progressive',
        });
    },
};

export default {
    init: Methods.init,
};
