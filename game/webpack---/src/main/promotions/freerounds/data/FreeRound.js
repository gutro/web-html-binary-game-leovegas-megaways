/**
 * Data model and validation for a FreeRound object as represented within a PromoInfo object
 *
 * @class
 */
export class FreeRound {
  /**
   * FreeRound constructor
   *
   * @param {String} campaignId
   * @param {String} activationId
   * @param {String} endDate
   * @param {Number} totalWin
   * @param {Number} campaignValue
   * @param {Boolean} rejectable 
   * @param {Object} options Object representing the option(s) available
   * @constructor
   */
  constructor(campaignId, activationId, endDate, totalWin, campaignValue, rejectable, options) {
    this['CAMPAIGNID']        = campaignId
    this['ACTIVATIONID']      = activationId
    this['ENDDATE']           = endDate
    this['TOTALWIN']          = totalWin
    this['CAMPAIGNVALUE']     = campaignValue
    this['REJECTABLE']        = rejectable
    this['OPTIONS']           = new Array()

    for(let j=0; j < options.length; j++) {
      const option = {}

      option['BETLEVEL']        = options[j]['BETLEVEL']
      option['FEATURE']         = options[j]['FEATURE']
      option['REMAININGROUNDS'] = options[j]['REMAININGROUNDS']
      option['TOTALROUNDS']     = options[j]['TOTALROUNDS']

      this['OPTIONS'].push(option)
    }
  }
}


// WEBPACK FOOTER //
// ./src/main/promotions/freerounds/data/FreeRound.js