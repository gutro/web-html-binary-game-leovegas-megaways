import { FreeRound } from './data/FreeRound'
import { FreeRoundInfo } from './data/FreeRoundInfo'
import { GCMNotification } from '../../GCMNotification'

/**
 * This class handles freeround promotions
 *
 * @class
 */
export class FreeRounds {
  /**
   * FreeRounds constructor
   *
   * @param {Object} freeRounds Array of one or more freerounds
   * @param {Object} notificationHandler {@See NotificationHandler}
   * @param {Object} ccyFormatter {@See CurrencyFormat}* @constructor
   * @param {Function} onReadyCallback function to be called when ready
   * @constructor
   */
  constructor(freeRounds, notificationHandler, ccyFormatter, onReadyCallback) {
    this.freeRounds = new Array();
    this.activeFreeRound = null;
    this.notificationHandler = notificationHandler;
    this.ccyFormatter = ccyFormatter;
    this.onReadyCallback = onReadyCallback;

    this.activateFreeRounds(freeRounds);
  }

  /**
   * Validates the freeRounds param, selects the next freeround to be made available to the 
   * customer and puts a notification into the notification handler
   *
   * @param {Object} freeRounds Array of one or more freerounds
   */
  activateFreeRounds(freeRounds) {
    this.populateFreeRounds(freeRounds)
    this.activeFreeRound = this.getNextFreeRound()

    if(this.activeFreeRound !== null) {
      if (this.activeFreeRound['STATUS'] === 'inprogress') {
        this.notificationHandler.handleNotification(
          new GCMNotification(
            GCMNotification.TYPE.COMMONUI_FREEROUNDS_IN_PROGRESS,
            JSON.parse(JSON.stringify(this.activeFreeRound)),
            this.freeRoundsInProgressCallback.bind(this)
          )
        )
      } else {
        this.notificationHandler.handleNotification(
          new GCMNotification(
            GCMNotification.TYPE.COMMONUI_FREEROUNDS_AWARD,
            JSON.parse(JSON.stringify(this.activeFreeRound)),
            this.freeRoundsAwardCallback.bind(this)
          )
        )
      }
    } else {
      this.onReadyCallback()
    }
  }

  /**
   * Populates an array of FreeRoundInfo objects using the freeRounds param
   *
   * @param {Object} freeRounds Array of one or more freerounds
   */
  populateFreeRounds(freeRounds) {
    this.freeRounds = new Array()

    for(let i=0; i < freeRounds.length; i++) {
      const freeround = new FreeRoundInfo(
        freeRounds[i]['CAMPAIGNID'],
        freeRounds[i]['ACTIVATIONID'],
        freeRounds[i]['ENDDATE'],
        freeRounds[i]['TOTALWIN'],
        freeRounds[i]['CAMPAIGNVALUE'],
        freeRounds[i]['REJECTABLE'],
        freeRounds[i]['OPTIONS'],
        this.ccyFormatter
      )

      this.freeRounds.push(freeround)
    }
  }

  /**
   * Called with updated FreeRound data for the active freeround during game animation. This data is used to refresh 
   * the FreeRoundInfo for the active freeround.
   * 
   * If there is an active freeround and the remaining rounds and/or totalwin have been updated then a notification is 
   * put into the notification handler containing the updated FreeRoundInfo. This notification will then be pushed to 
   * the game & commonUI when the game is next idle
   *
   * @param {Object} updFreeRounds Array of one updated freeround
   * @param {Boolean} gamePlayComplete True if the current game play is complete
   */
  updateFreeRounds(updFreeRounds, gamePlayComplete) {
    this.refreshActiveFreeRound(updFreeRounds[0])

    if(this.activeFreeRound !== null && gamePlayComplete) {
      // No callback needed as the notification handler incorperates general callback/acknowledgement functionality - see NotificationHandler.resume()
      this.notificationHandler.handleNotification(
        new GCMNotification(
          GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE,
          JSON.parse(JSON.stringify(this.activeFreeRound))
        )
      )

      this.notificationHandler.handleNotification(
        new GCMNotification(
          GCMNotification.TYPE.GAME_FREEROUNDS_UPDATE,
          JSON.parse(JSON.stringify(this.activeFreeRound))
        )
      )
    }
  }

  /**
   * Clear active freeround if it is completed
   */
  clearCompletedActiveFreeRound() {
    if(this.activeFreeRound !== null && this.activeFreeRound['STATUS'] === 'completed') {
      this.activeFreeRound = null
    }
  }

  /**
   * Refreshes the active freeround with the information held in the freeRounds array
   *
   * @private
   */
  refreshActiveFreeRound(updFreeRounds) {
    if (this.activeFreeRound !== null) {
      const campaignId = this.activeFreeRound['CAMPAIGNID']
      const activationId = this.activeFreeRound['ACTIVATIONID']
      const totalWin = this.activeFreeRound['TOTALWIN']
      const remainingRounds = this.activeFreeRound['OPTIONS'][0]['REMAININGROUNDS']

      this.activeFreeRound = null

      for(let i=0; i < this.freeRounds.length; i++) {
        if (this.freeRounds[i]['CAMPAIGNID'] === campaignId && this.freeRounds[i]['ACTIVATIONID'] === activationId) {
          const freeround = this.freeRounds[i]

          // Check totalwin
          if (updFreeRounds['TOTALWIN'] !== undefined &&
              updFreeRounds['TOTALWIN'] !== freeround['TOTALWIN']) {

            freeround.setTotalWin(updFreeRounds['TOTALWIN'], this.ccyFormatter)
          }

          // Check remainingrounds
          if (updFreeRounds['OPTIONS'] !== undefined &&
              updFreeRounds['OPTIONS'].length === 1 &&
              updFreeRounds['OPTIONS'][0]['REMAININGROUNDS'] !== undefined &&
              updFreeRounds['OPTIONS'][0]['REMAININGROUNDS'] !== freeround['OPTIONS'][0]['REMAININGROUNDS']) {

            freeround.setRemainingRounds(updFreeRounds['OPTIONS'][0]['REMAININGROUNDS'])
          }

          this.activeFreeRound = this.freeRounds[i]
          break
        }
      }
    }
  }

  /**
   * Retrieves the next available freeround from the freeRounds array
   *
   * @private
   * @returns {FreeRoundInfo} the next available {@see FreeRoundInfo}, else null
   */
  getNextFreeRound() {
    // Completed freerounds can be ignored
    const openFreeRounds = this.freeRounds.filter(this.isIncompleted)

    // If 0 or 1 freerounds available, we can return immediately
    if (openFreeRounds.length === 0) {
      return null
    } else if (openFreeRounds.length === 1) {
      return openFreeRounds[0]
    }

    // Inprogress freerounds are returned first
    const inprogressFreeRounds = openFreeRounds.filter(this.isInProgress)
    if (inprogressFreeRounds.length === 1) {
      return inprogressFreeRounds[0]
    } else if (inprogressFreeRounds.length > 1) {
      return inprogressFreeRounds.sort(this.sortByEndDate)[0]
    }

    // Else freerounds which cannot be rejected 
    const notRejectableFreeRounds = openFreeRounds.filter(this.isNotRejectable)
    if (notRejectableFreeRounds.length === 1) {
      return notRejectableFreeRounds[0]
    } else if (notRejectableFreeRounds.length > 1) {
      return notRejectableFreeRounds.sort(this.sortByEndDate)[0]
    }

    // Else we return the freeround which ends the soonist
    return openFreeRounds.sort(this.sortByEndDate)[0]
  }

  /**
   * Is there currently an active freeround in progress
   *
   * @returns {boolean} true if there is an active freeround
   */
  isActiveFreeRound() {
    return this.activeFreeRound !== null
  }

  /**
   * Called when creating a PromoInfo object to return via a Promotions.getPromoInfo(). 
   * Clones the active freeround.
   *
   * @returns {FreeRound} cloned freeround 
   */
  cloneActiveFreeRound() {
    if (this.activeFreeRound === null) {
      return this.activeFreeRound
    }

    return new FreeRound(
      this.activeFreeRound['CAMPAIGNID'],
      this.activeFreeRound['ACTIVATIONID'],
      this.activeFreeRound['ENDDATE'],
      this.activeFreeRound['TOTALWIN'],
      this.activeFreeRound['CAMPAIGNVALUE'],
      this.activeFreeRound['REJECTABLE'],
      this.activeFreeRound['OPTIONS']
    )
  }

  /**
   * Is freeround not rejectable
   *
   * @private
   * @param {FreeRoundInfo} freeround
   * @returns {boolean}
   */
  isNotRejectable(freeround) {
    return !freeround['REJECTABLE']
  }

  /**
   * Is freeround in progress
   *
   * @private
   * @param {FreeRoundInfo} freeround
   * @returns {boolean}
   */
  isInProgress(freeround) {
    return freeround['STATUS'] === 'inprogress'
  }

  /**
   * Is freeround incompleted
   *
   * @private
   * @param {FreeRoundInfo} freeround
   * @returns {boolean}
   */
  isIncompleted(freeround) {
    return freeround['STATUS'] !== 'completed'
  }

  /**
   * Compares the end date of two freerounds, used to sort based on end date
   *
   * @private
   * @param {FreeRoundInfo} freeround1
   * @param {FreeRoundInfo} freeround2
   * @returns {number}
   */
  sortByEndDate(freeround1, freeround2) {
    return new Date(freeround1['ENDDATE']) - new Date(freeround2['ENDDATE'])
  }

  /**
   * Callback function to be called by the commonUI when GCMNotification.TYPE.COMMONUI_FREEROUNDS_AWARD
   * has been handled and the customer has choosen an option or rejected the freeround
   *
   * @param {Number} betLevel the non ccy formatted BETLEVEL value of the option choosen, else 0 if freeround was rejected
   */
  freeRoundsAwardCallback(betLevel) {
    // Check to see if the customer rejected the freeround
    if (betLevel === 0) {
      // Confirm that this freeround can be rejected
      if (this.activeFreeRound['REJECTABLE'] === true) {
        this.activeFreeRound = null
        this.onReadyCallback()
      } else {
        throw new Error ('FreeRound cannot be used later')
      }
    } else {
      // Preserve only the option which was selected
      const options = this.activeFreeRound['OPTIONS']
      for (let i = options.length-1; i >= 0; i--) {
        if (options[i]['BETLEVEL'] !== betLevel) {
          options.splice(i, 1)
        }
      }

      // Ensure one option is present
      if (this.activeFreeRound['OPTIONS'].length !== 1) {
        throw new Error ('Invalid FreeRound option selected')
      }

      // Send the FreeRound information to CommonUI, which will then notify the game and finally call the onReadyCallback
      this.notificationHandler.handleNotification(
        new GCMNotification(
          GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE,
          JSON.parse(JSON.stringify(this.activeFreeRound)),
          this.freeRoundsCommonUIActivatedCallback.bind(this)
        )
      )
    }
  }

  /**
   * Callback function to be called by the commonUI when GCMNotification.TYPE.COMMONUI_FREEROUNDS_IN_PROGRESS
   * has been handled.
   */
  freeRoundsInProgressCallback() {
    // Send the FreeRound information to CommonUI, which will then notify the game and finally call the onReadyCallback
    this.notificationHandler.handleNotification(
      new GCMNotification(
        GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE,
        JSON.parse(JSON.stringify(this.activeFreeRound)),
        this.freeRoundsCommonUIActivatedCallback.bind(this)
      )
    )
  }

  /**
   * Callback function made by the commonui when it recieves the initial GCMNotification.TYPE.COMMONUI_FREEROUNDS_UPDATE notification
   * when activating/initalising a new freeround
   */
  freeRoundsCommonUIActivatedCallback() {
    this.notificationHandler.handleNotification(
      new GCMNotification(
        GCMNotification.TYPE.GAME_FREEROUNDS_UPDATE,
        JSON.parse(JSON.stringify(this.activeFreeRound)),
        this.freeRoundsGameActivatedCallback.bind(this)
      )
    )
  }

  /**
   * Callback function made by the game when it recieves the initial GCMNotification.TYPE.GAME_FREEROUNDS_UPDATE notification
   * when activating/initalising a new freeround
   */
  freeRoundsGameActivatedCallback() {
    this.onReadyCallback()
  }

  /**
   * Is the active freeround finished
   *
   * @returns {boolean}
   */
  isActiveFreeRoundFinished() {
    if(this.isActiveFreeRound()) {
      return this.activeFreeRound['OPTIONS'][0]['REMAININGROUNDS'] === 0
    } else {
      return false
    }
  }

  /**
   * Retrieve the total win value of the active freeround
   *
   * @returns {Number}
   */
  getActiveFreeRoundTotalWin() {
    return this.activeFreeRound['TOTALWIN']
  }
}


// WEBPACK FOOTER //
// ./src/main/promotions/freerounds/FreeRounds.js