/**
 * Data model for a CMA Option
 *
 * @class
 */
export default class CmaOption {

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
// ./src/main/message/cma/CmaOption.js