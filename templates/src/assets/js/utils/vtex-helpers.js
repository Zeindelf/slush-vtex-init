
export default {
    /**
     * Formats Vtex price
     *
     * @param {number|string}       number              The number to format
     * @param {string}              [thousands = '.']   The thousands delimiter
     * @param {string}              [decimals = ',']    The decimal delimiter
     * @param {integer}             [length = 2]        The length of decimal
     * @param {boolean/string}      [currency = 'R$ ']  Set currency
     * @returns {string} The formatted price
     */
    formatPrice(number, thousands, decimals, length, currency) {
        currency = typeof currency == 'string' ? currency : 'R$ ';
        length = typeof length !== 'number' ? 2 : length;

        const re = '\\d(?=(\\d{' + (3) + '})+' + (length > 0 ? '\\D' : '$') + ')';
        number = number / 100;
        number = (number * 1).toFixed(Math.max(0, ~~length));

        return currency + number.replace('.', (decimals || ',')).replace(new RegExp(re, 'g'), '$&' + (thousands || '.'));
    },

    /**
     * Check if the given price is valid
     *
     * @param {string}      price               The price to check
     * @param {string}      [thousand = ','']   The thousands separator
     * @param {string}      [decimal = '.'']    The decimal separator
     * @param {int}         [decimalLength = 2] The decimal length
     * @returns {boolean}
     */
    isValidPrice(price, thousands, decimal, decimalLength) {
        // ^[0-9]{1,3}(?:\,(?:(?:[0-9]{3}(?:,|))+))?(?:\.[0-9]{0,2})?$
        thousands = thousands || ',';
        decimal = decimal || '.';
        decimalLength = typeof decimalLength !== 'number' ? 2 : decimalLength;
        const regex = new RegExp('^[0-9]{1,3}(?:\\' + thousands + '(?:(?:[0-9]{3}(?:' + thousands + '|))+))?(?:\\' + decimal + '[0-9]{0,' + decimalLength + '})?$');
        return regex.test(price.toString());
    },

    /**
     * Get the original VTEX image source from a thumb
     *
     * @param {string}      [src]   The source of the thumb
     * @returns {string} The original image source
     * @example
     *     getOriginalImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png');
     *     // http://domain.vteximg.com.br/arquivos/ids/155242/image.png
     */
    getOriginalImage(src) {
        return typeof src == 'string' ? src.replace(/(ids\/[0-9]+)-([0-9-]+)\//, '$1/') : src;
    },

    /**
     * Change the width & height from a given VTEX image source
     *
     * @param {string}      [src]       The source of the image
     * @param {int|string}  [width]     The new image with
     * @param {int|string}  [height]    The new image height
     * @returns {string} The resized image source
     * @example
     *     getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242-292-292/image.png', 500, 600);
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-500-600/image.png
     *
     *     getResizedImage('http://domain.vteximg.com.br/arquivos/ids/155242/image.png', 100, 100);
     *     // http://domain.vteximg.com.br/arquivos/ids/155242-100-100/image.png
     */
    getResizedImage(src, width, height) {
        if ( width === undefined || height === undefined || typeof src != 'string' ) {
            return src;
        }

        src = src.replace(/(?:ids\/[0-9]+)-([0-9]+)-([0-9]+)\//, function(match, matchedWidth, matchedHeight) {
            return match.replace('-' + matchedWidth + '-' + matchedHeight, '-' + width + '-' + height);
        });

        return src.replace(/(ids\/[0-9]+)\//, '$1-' + width + '-' + height + '/');
    },

    /**
     * Replace break lines from product descriptions/more
     *
     * @param  {string}  str  String to replace
     * @return {string}       New string with <br /> break lines
     */
    replaceBreakLines(str) {
        if ( str.replace ) {
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
        } else {
            str = '';
        }

        return str;
    },
};
