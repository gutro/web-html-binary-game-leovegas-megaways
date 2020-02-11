/**
 * @author xliu
 * Date: 17/07/12
 * */

import { SingletonBase } from './SingletonBase';
import { NotificationHandler } from './NotificationHandler';
import { Validate } from './Validate';
import { GCMEvent } from './GCMEvent';

/**
 * @class
 * This GameStateController is a singleton class. 

 * This class manages game states and coordinates state actions between game and commonUI.
 *
 * @constructor
 */
export class GameStateController {
  constructor() {
    /** @private
     * @type {?function()}*/
    this.gameResumeCallback_ = null;

    /**
     * The life-cycle state the system is in
     * @type {GameStateController.STATE}
     * @private
     */
    this.playState_ = GameStateController.STATE.IDLE;

    /**
     * @private
     * @type {Object}
     * */
    this.commonUI_ = null;

    /**
     * @private
     * @type {NotificationHandler}
     * */
    this.notificationHandler_ = null;

    //return new SingletonBase(this);
    return SingletonBase.call(this);
  }

  init(commonUI) {
    this.commonUI_ = commonUI;
    /**
     * @type {NotificationHandler}
     * A reference to singleton instance gcm.notification.NotificationHandler, the constructor will
     * return a reference to the singleton instance.
     * */
    this.notificationHandler_ = new NotificationHandler();
  }

  gameAnimationStart() {
    this.playState_ = GameStateController.STATE.GAME_ANIMATING;
    if (this.commonUI_) {
      this.commonUI_.gameAnimationStart();
    }
  }

  gameAnimationComplete(resumeCallback) {

    if (!Validate.isFunction(resumeCallback)) {
      throw new Error('gcm.gameAnimationComplete: Invalid callback function');
    }

    //save game resumeCallback for later use
    this.gameResumeCallback_ = resumeCallback;

    // Set game state to IDLE as animation finished
    this.playState_ = GameStateController.STATE.IDLE;

    if (this.notificationHandler_.hasPendingNotification()) {
      this.notificationHandler_.addEventListener(GCMEvent.COMPLETE, this.onNotificationHandleComplete_, this);
      this.notificationHandler_.handleNotification();
    }
    else {
      if (this.commonUI_) {
        this.commonUI_.gameAnimationComplete();
      }
    }
  }

  notifyCommonUIStart() {
    this.playState_ = GameStateController.STATE.COMMONUI_NOTIFY;
  }

  notifyCommonUIEnd() {
    this.playState_ = GameStateController.STATE.IDLE;
  }

  isGameIdle() {
    return this.playState_ == GameStateController.STATE.IDLE;
  }

  onNotificationHandleComplete_() {
    this.notificationHandler_.removeEventListener(GCMEvent.COMPLETE, this.onNotificationHandleComplete_, this);
    if (this.commonUI_) {
    this.commonUI_.gameAnimationComplete();
    }
  }
};


/**
 * The possible life-cycle states that the system can be in:
 * COMMONUI_NOTIFY, GAME_ANIMATING and IDLE.
 * @enum {string}
 */
GameStateController.STATE = {
  COMMONUI_NOTIFY: 'COMMONUI_NOTIFY',
  GAME_ANIMATING: 'GAME_ANIMATING',
  IDLE: 'IDLE'
};


// WEBPACK FOOTER //
// ./src/main/GameStateController.js