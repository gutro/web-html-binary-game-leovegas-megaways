/**
 * Data model for a Reality Check Option
 *
 * @class
 */
export default class RcOption {

  /**
   * @param {String} id
   * @param {String} action
   * @param {String} body
   * @constructor
   */
  constructor(id, action, body) {
    this.ID = parseInt(id);
    this.ACTION = action;
    this.BODY = body;
  }

}


// WEBPACK FOOTER //
// ./src/main/message/rc/RcOption.js