import { Validator } from 'jsonschema'
import { jsonSchema } from './PromoInfoSchema'

/**
 * Data model and validation for the promoInfo object.
 *
 * @class
 */
export class PromoInfo {
  /**
   * PromoInfo constructor
   *
   * @constructor
   */
  constructor() {
    this['PROMOTIONS'] = {}
  }

  /**
   * Validates the argument against the expected PromoInfo json schema. If valid, it clones the 
   * in promoInfoObj and stores it
   *
   * @param {Object} promoInfoObj An object representing the available promotions data. The format of this is defined by GCM
   * @throws {Error} if promoInfoObj cannot be successfully validated against the PromoInfo json schema
   */
  populate(promoInfoObj) {
    //clone and store promotional info
    this['PROMOTIONS'] = JSON.parse(JSON.stringify(promoInfoObj))['PROMOTIONS']

    this.validatePromoInfo()
  }

  /**
   * Validates the structure of the PromoInfo object
   * 
   * @private 
   * @throws {Error} if this PromoInfo object is invalid
   */
  validatePromoInfo() {
    const validator = new Validator()

    const errors = validator.validate(this, jsonSchema).errors
    if (errors.length !== 0) {
      this['PROMOTIONS'] = {}
      throw new Error('Invalid promotional information: ' + errors[0].stack)
    }
  }

  /**
   * Populates this PromoInfo object with the single FreeRound object passed in. Then validates the PromoInfo object
   * 
   * @param {Object} freeRoundObj An object representing the available promotions data. The format of this is defined by GCM
   * @throws {Error} if this PromoInfo object cannot be successfully validated against the PromoInfo json schema
   */
  setFreeRound(freeRoundObj)  {
    //store freeround info
    this['PROMOTIONS']['FREEROUNDS'] = new Array(freeRoundObj)

    this.validatePromoInfo()
  }

  /**
   * Does this PromoInfo object contain any promotions eg: FreeRounds
   * 
   * @returns {boolean} True if promotions exist, else false
   */
  hasPromotions() {
    return this['PROMOTIONS'] !== undefined && this.hasFreeRounds()
  }

  /**
   * Does this PromoInfo object contain any FreeRounds
   * 
   * @returns {boolean} True if freerounds exist, else false
   */
  hasFreeRounds() {
    return this['PROMOTIONS']['FREEROUNDS'] !== undefined && this['PROMOTIONS']['FREEROUNDS'].length > 0
  }

  /**
   * Get available FreeRounds
   * 
   * @returns {Object} Object representing available FreeRounds
   */
  getFreeRounds() {
    return this['PROMOTIONS']['FREEROUNDS']
  }

  /**
   * Returns true if current game play is complete, else false
   * 
   * @returns {boolean}
   */
  isGamePlayComplete() {
    return this['PROMOTIONS']['GAMEPLAY'] === 'complete'
  }

  /**
   * Set the game play status
   * 
   * @param {String} gamePlayStatus
   */
  setGamePlayStatus(gamePlayStatus) {
    this['PROMOTIONS']['GAMEPLAY'] = gamePlayStatus
  }

  /**
   * Get the game play status
   * 
   * @returns {String}
   */
  getGamePlayStatus() {
    return this['PROMOTIONS']['GAMEPLAY']
  }
}


// WEBPACK FOOTER //
// ./src/main/promotions/data/PromoInfo.js