/**
 * @fileoverview
 * CurrencyFormat contains internal functionality for GCM.<br>
 * None of the functions are exported for public use.
 */


/**
 * @class
 * This is a singleton untility class for GCM to format currency display based on given format. <br>
 * CurrencyFormat contains internal functionality for GCM.<br>
 * None of the functions are exported for public use.
 * @constructor
 **/


var currencyFormat = (

    function currencyFormat() {

        /** @const
         * @private
         * How many digits we have in fractional part of a numerical value
         * By default is 2 digits
         * */
        var digitsOfFractional_ = 2;
        /** @const
         * @private
         * How many digits we have for a thousand separator in a numerical value
         * By default is 3 digits
         * */
        var digitsOfThousand_ = 3;

        var thousandSeparator_ = null;//thousandSeparator;
        var decimalSeparator_ = null;//decimalSeparator;
        var ccyCode_ = null;//ccyCode;


        /**
         * Initialize format specifying thousand separator, decimal separator and currency code.
         *
         * @param {string} thousandSeparator In UK style is ',' .
         * @param {string} decimalSeparator In UK style is '.' .
         * @param {string} ccyCode In UK currency is 'GBP'.
         * */
        var init = function (thousandSeparator, decimalSeparator, ccyCode) {
            console.log("currencyFormat.init() "+thousandSeparator +", "+decimalSeparator+", "+ccyCode);
            thousandSeparator_ = thousandSeparator;
            decimalSeparator_ = decimalSeparator;
            ccyCode_ = ccyCode;
        };

        /**
         * Called by commonUI for the currency formatting
         * return formatted currency object.
         *
         * @param {number} value money value to format.
         * @return {Object} ccyObj an object containing money information in the following format
         *         {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£',
         *         ccy_thousand_separator: ',', ccy_decimal_separator: '.'}.
         * */
        var format = function (value) {
                            /** @const */
                            var fractionalUnit = Math.pow(10, digitsOfFractional_);
                            /** @const */
                            var thousandUnit = Math.pow(10, digitsOfThousand_);

                            var digitValue = parseFloat(value);

                            var sign = "";
                            if (digitValue < 0) {
                                digitValue = digitValue * -1;
                                sign = "-";
                            }

                            var intPart = Math.floor(digitValue);
                            var decimalPart = Math.round(digitValue * fractionalUnit) % fractionalUnit;

                            //handle decimal part
                            var decimalString = padZero_(decimalPart, digitsOfFractional_);

                            //handle thousand separator
                            var intStrParts = [];
                            var intString = '0';
                            while (intPart > 0) {
                                var intSegment = intPart - Math.floor(intPart / thousandUnit) * thousandUnit;
                                if (intPart != intSegment)
                                    intSegment = padZero_(intSegment, digitsOfThousand_);

                                intStrParts.unshift(intSegment);
                                intPart = Math.floor(intPart / thousandUnit);
                            }

                            if (intStrParts.length > 0)
                                intString = intStrParts.join(thousandSeparator_);

                            var ccySymbol = currencyCodeMap[ccyCode_];
                            var currencyString = intString + decimalSeparator_ + decimalString;
                            var displayString;
                            if (ccySymbol)
                                displayString = sign + ccySymbol + currencyString;
                            else
                                displayString = sign + currencyString + ccyCode_;


                            return {
                                'display': displayString,
                                'code': ccyCode_,
                                'value': value,
                                'amount': value,
                                'currency_symbol': ccySymbol,
                                'ccy_thousand_separator': thousandSeparator_,
                                'ccy_decimal_separator': decimalSeparator_
                            };
                        };

        /**
         * add zeroes to fill digit segments
         * @private
         * @param {number} value numerical value for padding.
         * @param {number} maxDigits maximum number of digits.
         * @return {string} result the padded string.
         * */
        var padZero_ = function (value, maxDigits) {
            /**@type {string}*/
            var result = String(value);

            for (var i = 1; i < maxDigits; i++) {
                if (value < Math.pow(10, i))
                    result = '0' + result;
            }

            return result;
        };

        var currencyCodeMap = {
          'AED': '\u062F\u002e\u0625',
          'ARS': '$',
          'AUD': '$',
          'BDT': '\u09F3',
          'BRL': 'R$',
          'CAD': '$',
          'CHF': 'Fr.',
          'CLP': '$',
          'CNY': '\u00a5',
          'COP': '$',
          'CRC': '\u20a1',
          'CUP': '$',
          'CZK': 'K\u010d',
          'DKK': 'kr',
          'DOP': '$',
          'EGP': '\u00a3',
          'EUR': '\u20ac',
          'GBP': '\u00a3',
          'HKD': '$',
          'HRK': 'kn',
          'HUF': 'Ft',
          'IDR': 'Rp',
          'ILS': '\u20AA',
          'INR': 'Rs',
          'IQD': '\u0639\u062F',
          'ISK': 'kr',
          'JMD': '$',
          'JPY': '\u00a5',
          'KRW': '\u20A9',
          'KWD': '\u062F\u002e\u0643',
          'LKR': 'Rs',
          'LVL': 'Ls',
          'MNT': '\u20AE',
          'MXN': '$',
          'MYR': 'RM',
          'NOK': 'kr',
          'NZD': '$',
          'PAB': 'B/.',
          'PEN': 'S/.',
          'PHP': 'P',
          'PKR': 'Rs.',
          'PLN': 'z\u0142',
          'RON': 'L',
          'RUB': '\u0440\u0443\u0431',
          'SAR': '\u0633\u002E\u0631',
          'SEK': 'kr',
          'SGD': '$',
          'SKK': 'Sk',
          'SYP': 'SYP',
          'THB': '\u0e3f',
          'TRY': 'TL',
          'TWD': 'NT$',
          'USD': '$',
          'UYU': '$',
          'VEF': 'Bs.F',
          'VND': '\u20AB',
          'XAF': 'FCFA',
          'XCD': '$',
          'YER': 'YER',
          'ZAR': 'R'
        };

        return {
            'init': init,
            'format': format
        };
    }());
