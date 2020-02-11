/**
 * Validation functions for input validation
 */

const gcmLauncherPostMessageMethods = [
    'getOGSParams',
    'loadCommonUI',
    'commonUIReady',
    'commonUIResize',
    'gameRevealed',
    'reload',
    'redirect',
    'showCommonUI',
    'hideCommonUI',
    'launcherLoaded'
];

const gcmPostMessageMethods = [
    'configure',
    'launcherResized',
    'registerService',
    'commonUIReady',
    'commonUIResize',
    'gameRevealed',
    'optionHasChanged',
    'resume',
    'reload',
    'redirect',
    'showCommonUI',
    'hideCommonUI',
    'isGameIdle',
    'balancesUpdate',
    'setOGSParams',
    'gsPlayerAction',
    'syndicateJackpotWinAwardDialogClosed'
];

const commonUIPostMessageMethods = [
    'stakeUpdate',
    'paidUpdate',
    'balancesUpdate',
    'loadProgressUpdate',
    'gameReady',
    'configReady',
    'gameAnimationStart',
    'gameAnimationComplete',
    'gameIdle',
    'handleError',
    'handleSessionDurationUpdate',
    'regOption',
    'optionHasChanged',
    'handleSessionStats',
    'gameResized',
    'gameHasLoadingScreen',
    'handleMessageTrigger',
    'handleGSTrigger',
    'handleFreeRoundsAward',
    'handleFreeRoundsInProgress',
    'handleFreeRoundsUpdate',
    'pollJackpots',
    'showSyndicateJackpotWinAward',
    'showSyndicateJackpotProgressBar',
    'disposeSyndicateJackpotProgressBar'
];

export class Validate {
    constructor() {
    };

    /**
     * Check the a balances object is in the correct format
     * @param {Object} balances object.
     * @param {string} fundMode determines whether game is use any other fund mode than cash or freebet.
     * @return {boolean} the result of the check.
     */
    static isBalances(balances, fundMode) {
        //return false if it's null object
        if (!balances)
            return false;

        //balances must include at least a CASH balance
        if (typeof balances['CASH'] !== 'object') {
            return false;
        }

        for (const type in balances) {
            if (typeof balances[type]['amount'] !== 'number') {
                return false;
            }
        }
        if (fundMode && 'FREESPIN' == fundMode) {
            if (typeof balances['FREESPIN'] !== 'object')
                return false;
        }
        else {
            if (typeof balances['FREESPIN'] == 'object')
                return false;
        }
        return true;
    };

    /**
     * Check that a errorInfo contains the correct properties.
     * @param {Object} errorInfo an errorInfo object.
     * @return {boolean} the result of the check.
     */
    static isErrorInfo(errorInfo) {
        if (!errorInfo) {
            return false;
        }

        return !(typeof errorInfo['errorCode'] == 'undefined' || typeof errorInfo['errorMessage'] == 'undefined');
    };

    /**
     * Check the a accountInfo ccy params are in the correct format
     * CCY code can be empty.
     *
     * @param {Object} accountInfo object.
     * @return {boolean} the result of the check.
     */
    static isValidCurrencyOps(accountInfo) {

        if (!accountInfo)
            return false;

        const patternSeparator = /^[\D]$/;
        const patternCCY = /^[\D]*$/;

        return patternSeparator.test(accountInfo['ccy_thousand_separator']) &&
            patternSeparator.test(accountInfo['ccy_decimal_separator']) &&
            patternCCY.test(accountInfo['ccy_code']);
    };

    /**
     * Check the input is numeric
     * @param {number} value the number to validate.
     * @return {boolean} the result of the check.
     */
    static isNumericValue(value) {
        return (typeof value) == 'number' && !isNaN(parseFloat(value)) && isFinite(value);
    };


    /**
     *
     * @param {number} value the number to validate.
     * @return {boolean} the result of the check.
     */
    static isIntegerValue(value) {

        return (typeof value) == 'number' && !isNaN(parseInt(value, 10)) && parseInt(value, 10) == value && isFinite(value);
    };


    /**
     * @param {number} value the percentage value to validate.
     * @return {boolean} the result of the check.
     */
    static isPercentValue(value) {

        if (this.isNumericValue(value)) {
            return (parseFloat(value) <= 100) && !(parseFloat(value) < 0);
        }
        return false;
    };

    /**
     * Checks that the input is a valid css height spec.
     * valid units: %,in,cm,mm,em,ex,pt,pc,px
     *
     * @param {string} value the number to validate.
     * @return {boolean} the result of the check.
     */
    static isHeight(value) {
        const height = /^\d+(\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)/;
        return height.test(value);
    };


    /**
     * Checks that this is a string of non zero length with only letters and numbers
     * @param {string} str the value to validate.
     * @return {boolean} the result of the check.
     */
    static isAlphaNumeric(str) {
        if (typeof str != 'string')
            return false;

        return /^[a-zA-Z0-9]+$/.test(str);
    };

    /**
     * Checks that string is valid game name
     * @param {string} str the value to validate.
     * @return {boolean} the result of the check.
     */
    static isValidGameName(str) {
        if (typeof str != 'string')
            return false;

        return /^[a-zA-Z0-9\-_]+$/.test(str);
    };

    /**
     * Checks that string is valid language
     * language can be just a 
     * @param {string} str the value to validate.
     * @return {boolean} the result of the check.
     */
    static isValidLanguage(str) {
        if (typeof str != 'string')
            return false;

        const lang_array = str.split("-");
        const patternLanguage = /^[a-z]{2}$/;

        if (lang_array.length === 1)
            return patternLanguage.test(lang_array[0]);

        if (lang_array.length === 2) {
            const patternCountry = /^[A-Z]{2}$/;
            return patternLanguage.test(lang_array[0]) && patternCountry.test(lang_array[1]);
        }

        // otherwise
        return false;
    };

    /**
     * Checks the string is a single letter. Useful for checking channels
     * @param {string} str the value to validate.
     * @return {boolean} the result of the check.
     */
    static isSingleLetter(str) {
        return /^[a-zA-Z]$/.test(str);
    };


    /**
     * Checks the string is a single digit. Useful for checking channels
     * @param {string} str the value to validate.
     * @return {boolean} the result of the check.
     */
    static isSingleDigit(str) {
        return /^[0-9]$/.test(str);
    };


    /**
     * @param {Object} optionTypes enum of valid options.
     * @param {string} optionType for validation.
     * @return {boolean} the result of the check.
     */
    static isEnumOption(optionTypes, optionType) {

        let found = false;
        for (const key in optionTypes) {
            if (optionType === optionTypes[key]) {
                found = true;
                break;
            }
        }
        return found;
    };

    /**
     * @param {Object} callBack function passed through.
     * @return {boolean} the result.
     */
    static isFunction(callBack) {
        return typeof callBack === 'function';

    };

    /**
     * Helper function to check if a variable is defined, not empty and not null.
     * @param variable
     * @return {boolean} the result.
     */
    static isDefinedAndNotNull(inputVariable) {
        if (typeof (inputVariable) !== "undefined" && inputVariable !== null && inputVariable != "")
            return true;
        else
            return false;
    };

    /**
     * @param {Element} elem value to be validated.
     * @return {boolean} Is the object a DOM element.
     */
    static isElement(elem) {
        return Boolean(elem && typeof elem.appendChild === 'function');

    };

    /**
     * @param {String} methodName method to validate
     * @return {boolean} Returns true if the method supplied is a valid commonUI method
     */
    static isValidCommonUIMethod(methodName) {
        return commonUIPostMessageMethods.indexOf(methodName) != -1;
    };

    /**
     * @param {String} methodName method to validate
     * @return {boolean} Returns true if the method supplied is a valid GCM method
     */
    static isValidGCMMethod(methodName) {
        return gcmPostMessageMethods.indexOf(methodName) != -1;
    };

    /**
     * @param {String} methodName method to validate
     * @return {boolean} Returns true if the method supplied is a valid GCM Launcher method
     */
    static isValidGCMLauncherMethod(methodName) {
        return gcmLauncherPostMessageMethods.indexOf(methodName) != -1;
    };

    /**
     * @param {boolean} boolean input
     * @return {boolean} Returns true if the variable supplied is a valid boolean
     */
    static isValidBoolean(booleanVariable) {
        return typeof(booleanVariable) === "boolean";
    };
}



// WEBPACK FOOTER //
// ./src/main/Validate.js