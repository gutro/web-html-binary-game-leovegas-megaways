import OpenbetLogger from 'openbet-logger';

/**
 * @class
 * This Adapter class is responsible for transforming gcm calls to commonUI and commmonUI calls to gcm.
 * It converts all GCM javascript calls into post messages and sent to commonUI and
 * post messages from commonUI is converted into javascript calls in GCM.
 * @constructor
 */

export class CUIAdapter {

    constructor(gcmCore, commonUIWindow_, commonUIOrigin_) {

        this.gcm_ = gcmCore;
        this.commonUIWindow_ = commonUIWindow_;
        this.commonUIOrigin = commonUIOrigin_;
        this.commonUIReady_ = true;
        
        this._logger = new OpenbetLogger('GCM Debug');
    };

    /**
     * This is a post message sender method.
     * For all CUI javascript calls made on CUIAdapter, a post message is created to be sent to CUI.
     * The postMessage consists of two parts:
     * 1. action: the CUI method name that needs to be invoked.
     * 2. params: the list of arguments that needs to be passed to the above method.
     */
    sendPostMessageToCUI(methodName, parameters, isCallback) {

        if (this.commonUIReady_) {
            var postMessage = this.createPostMessage(methodName, parameters);
            this._logger.info("Sent post message to commonUI: " + postMessage);
            this.commonUIWindow_.postMessage(postMessage, this.commonUIOrigin);
        }
    };

    /**
     * Helper method to create Post Messsage(PM) Object that will be sent to CUI.
     * GCM PM Object has two data segments: 1. action, 2. params
     * action: The method to be called on CUI
     * params: The list of arguments to be passed to the method
     */
    createPostMessage(methodName, parameters) {
        var pmObject = {};

        pmObject["action"] = methodName;
        pmObject["params"] = parameters;

        return JSON.stringify(pmObject);
    };


    // All the CUI methods that GCM needs to call are declared below

    stakeUpdate(stake) {
        this.sendPostMessageToCUI("stakeUpdate", arguments);
    };

    paidUpdate(paid) {
        this.sendPostMessageToCUI("paidUpdate", arguments);
    };

    balancesUpdate(balances) {
        this.sendPostMessageToCUI("balancesUpdate", arguments);
    };

    loadProgressUpdate(percentLoaded) {
        this.sendPostMessageToCUI("loadProgressUpdate", arguments);
    };

    gameReady() {
        this.sendPostMessageToCUI("gameReady", arguments);
    };

    configReady() {
        this.sendPostMessageToCUI("configReady", arguments);
    };

    gameAnimationStart() {
        this.sendPostMessageToCUI("gameAnimationStart", arguments);
    };

    gameAnimationComplete() {
        this.sendPostMessageToCUI("gameAnimationComplete", arguments);
    };

    gameIdle(idle) {
        this.sendPostMessageToCUI("gameIdle", arguments);
    };

    handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams, timeout) {
        this.sendPostMessageToCUI("handleError", arguments);
    };

    handleSessionDurationUpdate(sessionDuration) {
        this.sendPostMessageToCUI("handleSessionDurationUpdate", arguments);
    };

    regOption(optionType, initialValue) {
        this.sendPostMessageToCUI("regOption", arguments);
    };

    optionHasChanged(optionType, newValue) {
        this.sendPostMessageToCUI("optionHasChanged", arguments);
    };

    handleSessionStats(stakes, winnings, turnover, timeout) {
        this.sendPostMessageToCUI("handleSessionStats", arguments);
    };

    gameResized() {
        this.sendPostMessageToCUI("gameResized", arguments);
    };

    gameHasLoadingScreen() {
        this.sendPostMessageToCUI("gameHasLoadingScreen", arguments);
    };

    handleMessageTrigger(message) {
        this.sendPostMessageToCUI("handleMessageTrigger", arguments);
    };

    handleGSTrigger(message) {
       this.sendPostMessageToCUI("handleGSTrigger", arguments);
    };

    handleFreeRoundsUpdate(freeRoundsInfo) {
        this.sendPostMessageToCUI('handleFreeRoundsUpdate', arguments)
    };

    handleFreeRoundsAward(freeRoundsInfo) {
        this.sendPostMessageToCUI('handleFreeRoundsAward', arguments)
    };

    handleFreeRoundsInProgress(freeRoundsInfo) {
        this.sendPostMessageToCUI('handleFreeRoundsInProgress', arguments)
    };

    showSyndicateJackpotWinAward(winInfo) {
        this.sendPostMessageToCUI("showSyndicateJackpotWinAward", arguments);
    };

    showSyndicateJackpotProgressBar(attributes) {
        this.sendPostMessageToCUI("showSyndicateJackpotProgressBar", arguments);
    };

    disposeSyndicateJackpotProgressBar(attributes) {
        this.sendPostMessageToCUI("disposeSyndicateJackpotProgressBar", arguments);
    }
}



// WEBPACK FOOTER //
// ./src/main/CUIAdapter.js