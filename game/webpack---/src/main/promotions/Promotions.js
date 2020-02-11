import { PromoInfo } from './data/PromoInfo'
import { FreeRounds } from './freerounds/FreeRounds'

/**
 * Class encapulating the promotional functionality
 *
 * @class
 */
export class Promotions {
  /**
   * Promotions constructor
   *
   * @param {Object} notificationHandler {@See NotificationHandler}
   * @constructor
   */
  constructor(notificationHandler) {
    this.enabled = false
    this.ccyFormatter = null
    this.notificationHandler = notificationHandler

    this.promotionalInfo = null
    this.freerounds = null
  }
  
  /**
   * Set currency formatter object
   *
   * @param {Object} ccyFormatter {@See CurrencyFormat}
   */
  setCcyFormatter(ccyFormatter) {
    this.ccyFormatter = ccyFormatter
  }

  /**
   * Enable promotions module
   *
   * @param {Boolean} enabled
   */
  setEnabled(enabled) {
    this.enabled = enabled
  }

  /**
   * Is the promotions module enabled?
   *
   * @return {Boolean}
   */
  isEnabled() {
    return this.enabled
  }

  /**
   * Validates and stores/updates promotional information.
   * Note that this can be called before init() in order to prime the module with promotional
   * information to be used during init()
   * 
   * @param {Object} promoInfo An object representing the available promotions data. The format of this is defined by GCM
   * @throws {Error} if promoInfo is invalid
   */
  setPromoInfo(promoInfo) {
    //Return immediately if promotions are not enabled
    if (!this.isEnabled()) {
      return
    }

    // Validate and store promotional information
    this.promotionalInfo = new PromoInfo()
    this.promotionalInfo.populate(promoInfo)

    // If enabled and active update FreeRounds information
    if(this.freerounds !== null && this.freerounds.isActiveFreeRound()) {
      this.freerounds.updateFreeRounds(this.promotionalInfo.getFreeRounds(), this.promotionalInfo.isGamePlayComplete())
    }
  }

  /**
   * Retrieves the currently active promotional information
   * 
   * @returns {Object} promoInfo An object representing the available promotions data.
   */
  getPromoInfo() {
    //Return immediately if promotions or freerounds are not enabled
    if (!this.isEnabled() || this.freerounds === null) {
      return null
    }

    const promoInfo = new PromoInfo()

    const freeround = this.freerounds.cloneActiveFreeRound()
    if (freeround !== null) {
      promoInfo.setGamePlayStatus(this.promotionalInfo.getGamePlayStatus())
      promoInfo.setFreeRound(freeround)
    }

    if (promoInfo.hasPromotions()) {
      return promoInfo
    } else {
      return null
    }
  }

  /**
   * This is called during initialisation/loading of the game - specifically when gcm.gameRevealed is called.
   * Used to initialise any promotions if applicable
   * i.e: populate a FreeRounds object and push a FreeRounds award notification to the commonUI
   *
   * @returns {Promise}
   */
  init() {
    if (this.isEnabled() && this.promotionalInfo !== null) {
      //Initialise FreeRounds if necessary
      if (this.promotionalInfo.hasFreeRounds()) {

        return new Promise(function(resolve, reject) {
          this.freerounds = new FreeRounds(this.promotionalInfo.getFreeRounds(), this.notificationHandler, this.ccyFormatter, resolve.bind(this))
        }.bind(this))
      }
    }

    return Promise.resolve()
  }

  /**
   * Retrieves the amount that the promotions module needs to fudge the balance by.
   * 
   * @returns {Number|null} null if the promotions module doesn't need to fudge the balance. Else
   *                         the value to fudge the balance is returned.
   */
  getPromoBalanceFudge() {
    //Return immediately if promotions or freerounds are not enabled/active
    if (!this.isEnabled() || this.freerounds === null || !this.freerounds.isActiveFreeRound()) {
      return null
    }

    if (this.freerounds.isActiveFreeRoundFinished() && this.promotionalInfo.isGamePlayComplete()) {
      return this.freerounds.getActiveFreeRoundTotalWin()
    } else {
      return 0
    }
  }

  /**
   * Inform the promotions module that the game has called gameAnimationComplete
   */
  gameAnimationComplete() {
    if (this.isEnabled()) {
      // If there is an active freeround then assess it's status and clear if necessary
      if(this.freerounds !== null && this.freerounds.isActiveFreeRound() && this.promotionalInfo.isGamePlayComplete()) {
        this.freerounds.clearCompletedActiveFreeRound()
      }
    }
  }
}


// WEBPACK FOOTER //
// ./src/main/promotions/Promotions.js