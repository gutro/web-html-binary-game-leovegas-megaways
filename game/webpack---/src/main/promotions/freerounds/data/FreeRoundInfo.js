import { Validator } from 'jsonschema'
import { FreeRound } from './FreeRound'
import { jsonSchema } from './FreeRoundInfoSchema'

/**
 * Data model and validation for the FreeRoundInfo object.
 *
 * @class
 */
export class FreeRoundInfo extends FreeRound {
  /**
   * FreeRoundInfo constructor
   *
   * @param {String} campaignId
   * @param {String} activationId
   * @param {String} endDate
   * @param {Number} totalWin
   * @param {Number} campaignValue
   * @param {Boolean} rejectable 
   * @param {Object} options Object representing the option(s) available
   * @param {Object} ccyFormatter {@See CurrencyFormat}
   * @extends FreeRound
   * @constructor
   */
  constructor(campaignId, activationId, endDate, totalWin, campaignValue, rejectable, options, ccyFormatter) {
    super(campaignId, activationId, endDate, totalWin, campaignValue, rejectable, options)
 
    this['TOTALWIN_FMT']      = ccyFormatter['format'](totalWin).display
    this['CAMPAIGNVALUE_FMT'] = ccyFormatter['format'](campaignValue).display

    for(let j=0; j < this['OPTIONS'].length; j++) {
      const option = this['OPTIONS'][j]

      option['BETLEVEL_FMT']    = ccyFormatter['format'](options[j]['BETLEVEL']).display
    }

    // Using REMAININGROUNDS to detemine status of FreeRound
    this['STATUS'] = 'notstarted'
    this.updateStatus()

    this.validateFreeRoundInfo()
  }

  /**
   * Set totalWin and validate FreeRoundInfo object
   */
  setTotalWin(totalWin, ccyFormatter) {
    this['TOTALWIN'] = totalWin
    this['TOTALWIN_FMT'] = ccyFormatter['format'](totalWin).display

    this.validateFreeRoundInfo()
  }

  /**
   * Set remainingRounds and status (based on remainingRounds) and validate FreeRoundInfo object
   */
  setRemainingRounds(remainingRounds) {
    this['OPTIONS'][0]['REMAININGROUNDS'] = remainingRounds

    this.updateStatus()

    this.validateFreeRoundInfo()
  }

  updateStatus() {
    // Using REMAININGROUNDS to detemine status of FreeRound
    if(this['OPTIONS'].length === 1) {
      if (this['OPTIONS'][0]['REMAININGROUNDS'] === 0) {
        this['STATUS'] = 'completed'
      } else if (this['OPTIONS'][0]['TOTALROUNDS'] > this['OPTIONS'][0]['REMAININGROUNDS']) {
        this['STATUS'] = 'inprogress'
      }
    }
  }


  /**
   * Validates the structure of a FreeRoundInfo object
   * 
   * @private
   * @param {FreeRoundInfo} freeroundInfo free round information object
   * @throws {Error} if this object has a invalid strucure
   */
  validateFreeRoundInfo() {
    const validator = new Validator()

    const errors = validator.validate(this, jsonSchema).errors
    if (errors.length !== 0) {
      throw new Error('Invalid freeround information: ' + errors[0].stack)
    }
  }
}


// WEBPACK FOOTER //
// ./src/main/promotions/freerounds/data/FreeRoundInfo.js