/**
 *
 * @author xliu
 * Date: 30/04/13
 */
//goog.provide('gcm.notification.model.GCMNotification');

/**
 * @class The base class of notification data model.
 * @constructor
 *
 * @param {string} type The type of a notification, should be from the enum list
 *                      GCMNotification.TYPE defined in GCMNotification class.
 * @param {Object|*} body The body of a notification with its content depending on
 *                      The type of a notification.
 * @param {Function=} callback (optional) The callback function a notification. This is
 *                      optional and only applies if notification expects resumption.
 */

/**
        * enumerate of notification types
        * @enum {string}
        * */
const TYPE = {
    ERROR: 'ERROR',
    SESSION_TIMER: 'SESSION_TIMER',
    SESSION_STATS: 'SESSION_STATS',
    BONUS_BAR: 'BONUS_BAR',
    BONUS_BAR_FILLED: 'BONUS_BAR_FILLED',
    FREEBET_REWARD: 'FREEBET_REWARD',
    GENERIC_MESSAGE: 'GENERIC_MESSAGE',
    GS_MESSAGE: 'GS_MESSAGE',
    COMMONUI_FREEROUNDS_AWARD: 'COMMONUI_FREEROUNDS_AWARD',
    COMMONUI_FREEROUNDS_IN_PROGRESS: 'COMMONUI_FREEROUNDS_IN_PROGRESS',
    COMMONUI_FREEROUNDS_UPDATE: 'COMMONUI_FREEROUNDS_UPDATE',
    GAME_FREEROUNDS_UPDATE: 'GAME_FREEROUNDS_UPDATE',
    SYNDICATED_JACKPOT_WIN_AWARD: 'SYNDICATED_JACKPOT_WIN_AWARD',
    SYNDICATED_JACKPOT_PROGRESS_BAR: 'SYNDICATED_JACKPOT_PROGRESS_BAR'
};

/**
* Enumeration of parameters within body of error notification.
* Critical notification. Should be displayed straight away regardless of game state,
* then wait for CommonUI callback, meanwhile queueing all other pending notifications.
*/
const ERROR = {
    CATEGORY: 'errorCategory',
    SEVERITY: 'errorSeverity',
    CODE: 'errorCode',
    MESSAGE: 'errorMessage',
    PARAMS: 'errorParams'
};

/**
 * Enumeration of parameters within body of session stats notification.
 * Session Stats information: Important notification. Should be displayed as soon as game is idle state,
 * then wait forCommonUI callback, meanwhile queueing all other pending notifications.
 */
const SESSION_STATS = {
    STAKES: 'stakes',
    WINNINGS: 'winnings',
    TURNOVER: 'turnover'
};

/**
 * Enumeration of parameters within body of session timer notification.
 * Session Timer information: Normal notification. Pushed to CommonUI immediately and no need to wait for confirmation.
 */
const SESSION_TIMER = {
    DURATION: 'duration'
};

/**
 * Enumeration of parameters within body of bonus bar notification.
 * Bonus Bar percentage change: Normal notification.
 * Pushed to CommonUI immediately and no need to wait for confirmation.
 */
const BONUS_BAR = {
    PERCENT: 'percent'
};

/**
 * Enumeration of parameters within body of freebet  notification.
 * Freebet reward message: Important notification. Should be displayed as soon as game is idle state,
 * then wait forCommonUI callback, meanwhile queueing all other pending notifications.
 */
const FREEBET = {
    AMOUNT: 'freebet'
};

/**
 * Any of the critical/important notification types detailed here
 * can have an optional timeout field in the notification body.
 * If the user does not acknoledge within this time, the notification will be cleared.
 */
const TIMEOUT = 'timeout';

/** @type {Array}
 * array of asap notifications types
 * */
/*const ASAP = [
    TYPE.ERROR;
];*/

/** @type {Array}
 * array of acknowledgement required notification types
 * */
const ACK = [
    TYPE.ERROR,
    TYPE.SESSION_TIMER,
    TYPE.SESSION_STATS,
    TYPE.BONUS_BAR,
    TYPE.BONUS_BAR_FILLED,
    TYPE.FREEBET_REWARD,
    TYPE.GENERIC_MESSAGE
];

export class GCMNotification {
    constructor(type, body, callback) {

        this.type = type;
        this.body = body;

        /** @private
         * @type {Function|undefined}
         * The callback function a notification. This is optional
         * and only applies if notification expects resumption.*/
        this.callback_ = callback;

        /** @private
         * @type {boolean}*/
        this.isUnique_ = false;

        /**
     * Returns the unique state of this notification. A unique notification can only have once instance in
     * a notification queue.
     * @return {boolean} the unique state of this notification.
     * */
        GCMNotification.prototype.isUnique = function () {
            return this.isUnique_;
        };

        /**
         * Invokes the callback function of notification, which should be done at
         * resumption of outstanding notification.
         * @param {*=} param The feedback parameter of notification. Its content depends
         *              on the notification specific. Which should be defined in notification
         *              data model.
         * */
        GCMNotification.prototype.invokeCallback = function (param) {
            if (this.callback_)
                this.callback_.call(null, param);
        };

        /**
         * For notifications that should only have one unique instance in queue of a same type.
         * The newer instance of a unique notification will replace the old one in queue, but
         * not take the old notifications position in queue.
         * */
        GCMNotification.prototype.markAsUnique = function () {
            this.isUnique_ = true;
        };
    }

    static get TYPE() {
        return TYPE;
    }

    static get ERROR() {
        return ERROR;
    }

    static get SESSION_STATS() {
        return SESSION_STATS;
    }

    static get SESSION_TIMER() {
        return
    }

    static get BONUS_BAR() {
        return BONUS_BAR;
    }

    static get FREEBET() {
        return FREEBET;
    }

    static get GENERIC_MESSAGE() {
        return GENERIC_MESSAGE;
    }

    static get ASAP() {
        return TYPE.ERROR;
    }

    static get TIMEOUT() {
        return
    }

    static get ACK() {
        return ACK;
    }
}



// WEBPACK FOOTER //
// ./src/main/GCMNotification.js