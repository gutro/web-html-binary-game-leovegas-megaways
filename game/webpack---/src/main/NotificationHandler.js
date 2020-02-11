import { EventDispatcher } from './EventDispatcher';
import { SingletonBase } from './SingletonBase';
import { GCMNotification } from './GCMNotification';
import { GameStateController } from './GameStateController';
import { GCMEvent } from './GCMEvent';

// goog.inherits(NotificationHandler, EventDispatcher);

export class NotificationHandler extends EventDispatcher {
  constructor() {
    super();
    //EventDispatcher.call(this);

    /** @type {Object}
     * @private The reference to commonUI instance. passed from gcmCore
     * */
    this.commonUI_ = null;

    /** @type {Object}
     * @private The reference to game instance. passed from gcmCore
     * */
    this.game_ = null;

    /** @type {GameStateController}
     * @private
     * */
    this.gameStateController_ = null;

    /** @type {Array}
     * @private
     * */
    this.noteQueue_ = [];

    /** @type {GCMNotification}
     * @private The notification that waiting for user acknowledgement.
     * */
    this.outstandingNotification_ = null;
    return SingletonBase.call(this);
  }

  init(commonUI) {
    this.commonUI_ = commonUI;
    this.noteQueue_ = [];
    this.outstandingNotification_ = null;
    /**@type {GameStateController}
     * A reference to singleton instance gcm.GameStateController, the constructor will
     * return a reference to the singleton instance.
     * */
    this.gameStateController_ = new GameStateController();
  }

  /**
   * Assign game reference to notification handler.
   * @param {Object} game A reference to the game instance.
   */
  setGame(game) {
      this.game_ = game
  }

  handleNotification(notification) {
    if (notification) {
      if (notification.isUnique())
        this.handleUniqueNotification_(notification);

      this.queueNotification_(notification);
    }

    //process the head notification in queue based on its importance level.
    if (this.commonUI_ && !this.outstandingNotification_) {
      const firstNote = this.noteQueue_.shift();
      if (firstNote) {
        // The notification will be send to CommonUI asap if its type is present in GCM Notification ASAP array element
        const isNotificationAsap = GCMNotification.ASAP.indexOf(firstNote.type);

        if (isNotificationAsap >= 0) {
          this.handleAlertNotification_(firstNote);
        } else if (firstNote.type == GCMNotification.TYPE.SESSION_TIMER) {

          const sessionDuration = firstNote.body[GCMNotification.SESSION_TIMER.DURATION];
          this.commonUI_.handleSessionDurationUpdate(sessionDuration);

          this.continueHandlePendingNotifications_();

        } else if (firstNote.type == GCMNotification.TYPE.BONUS_BAR) {

          const bonusBarPercent = firstNote.body[GCMNotification.BONUS_BAR.PERCENT];

          this.commonUI_.handleBonusBarUpdate(bonusBarPercent);
          this.continueHandlePendingNotifications_();

        } else {
          if (this.gameStateController_.isGameIdle()) {
            this.handleAlertNotification_(firstNote);
          } else {
            this.noteQueue_.unshift(firstNote);
          }
        }
      }
    }
  }

  hasPendingNotification() {
    return this.noteQueue_.length > 0;
  }

  resume(feedback) {
    try {
      if (this.outstandingNotification_)
        this.outstandingNotification_.invokeCallback(feedback);
    }
    catch (e) {
      throw e;
    }
    //This finally block ensure outstanding notification always get cleared on resumption
    //regardless of any possible exception in callback function.
    finally {
      this.outstandingNotification_ = null;
      this.gameStateController_.notifyCommonUIEnd();
      this.continueHandlePendingNotifications_();
    }
  }

  continueHandlePendingNotifications_() {
    if (this.hasPendingNotification())
      this.handleNotification();
    else
      this.dispatchEvent(new GCMEvent(GCMEvent.COMPLETE));
  }

  handleAlertNotification_(notification) {
    this.outstandingNotification_ = notification;

    this.gameStateController_.notifyCommonUIStart();
    const timeout = notification.body[GCMNotification.TIMEOUT];

    if (notification.type == GCMNotification.TYPE.ERROR) {
      const errorCategory = notification.body[GCMNotification.ERROR.CATEGORY];
      const errorSeverity = notification.body[GCMNotification.ERROR.SEVERITY];
      const errorCode = notification.body[GCMNotification.ERROR.CODE];
      const errorMessage = notification.body[GCMNotification.ERROR.MESSAGE];
      const errorParams = notification.body[GCMNotification.ERROR.PARAMS];
      this.commonUI_.handleError(
        errorCategory,
        errorSeverity,
        errorCode,
        errorMessage,
        errorParams,
        timeout
      );

    } else if (notification.type == GCMNotification.TYPE.SESSION_STATS) {
      const sessonStakes = notification.body[GCMNotification.SESSION_STATS.STAKES];
      const sessionWinnings = notification.body[GCMNotification.SESSION_STATS.WINNINGS];
      const sessionTurnover = notification.body[GCMNotification.SESSION_STATS.TURNOVER];
      this.commonUI_.handleSessionStats(sessonStakes, sessionWinnings, sessionTurnover, timeout);
    } else if (notification.type == GCMNotification.TYPE.BONUS_BAR_FILLED) {
       this.commonUI_.handleBonusBarFilled(timeout);
    } else if (notification.type == GCMNotification.TYPE.FREEBET_REWARD) {
      const freebetAmount = notification.body[GCMNotification.FREEBET.AMOUNT];
      this.commonUI_.handleFreebetAward(freebetAmount, timeout);
    } else if (notification.type == GCMNotification.TYPE.GENERIC_MESSAGE) {
      this.commonUI_.handleMessageTrigger(notification.body);
    } else if (notification.type == GCMNotification.TYPE.GS_MESSAGE) {
      this.commonUI_.handleGSTrigger(notification.body);
    } else if (notification.type === GCMNotification.TYPE.COMMONUI_FREEROUNDS_AWARD) {
      this.commonUI_.handleFreeRoundsAward(notification.body)
    } else if (notification.type === GCMNotification.TYPE.COMMONUI_FREEROUNDS_IN_PROGRESS) {
      this.commonUI_.handleFreeRoundsInProgress(notification.body)
    } else if (notification.type === GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE) {
      this.commonUI_.handleFreeRoundsUpdate(notification.body)
    } else if (notification.type === GCMNotification.TYPE.GAME_FREEROUNDS_UPDATE) {
      this.game_.handleFreeRoundsUpdate(notification.body)
    } else if (notification.type === GCMNotification.TYPE.SYNDICATED_JACKPOT_WIN_AWARD) {
      this.commonUI_.showSyndicateJackpotWinAward(notification.body);
    } else if (notification.type === GCMNotification.TYPE.SYNDICATED_JACKPOT_PROGRESS_BAR) {
      this.commonUI_.showSyndicateJackpotProgressBar(notification.body);
    } else {
      this.outstandingNotification_ = null;
      throw Error(`NotificationHandler.handleNotification: Unknown notification type [${notification.type}].`);
    }
  }

  disposeNotification(notification){
    if (notification.type === GCMNotification.TYPE.SYNDICATED_JACKPOT_PROGRESS_BAR) {
      this.commonUI_.disposeSyndicateJackpotProgressBar(notification.body);
    } else {
      throw Error(`NotificationHandler.disposeNotification: Unknown notification type [${notification.type}].`);
    }
  }

  handleUniqueNotification_(notification) {
    if (!notification.isUnique())
      return;

    for (let index = 0; index < this.noteQueue_.length; ++index) {
      const currentNote = this.noteQueue_[index];
      if (currentNote.isUnique() && currentNote.type == notification.type) {
        this.noteQueue_.splice(index, 1);
        index--;
      }
    }
  }

  queueNotification_(notification) {
    if (notification.type == GCMNotification.TYPE.ERROR) {
      if (this.noteQueue_.length > 0) {
        for (let index = 0; index < this.noteQueue_.length; ++index) {
          const newNotification = this.noteQueue_[index];
          if (newNotification.type == GCMNotification.TYPE.ERROR) {
            continue;
          } else {
            break;
          }
        }
        this.noteQueue_.splice(index, 0, notification);
      } else {
        this.noteQueue_.push(notification);
      }
    } else {
      this.noteQueue_.push(notification);
    }
  }
}


// WEBPACK FOOTER //
// ./src/main/NotificationHandler.js