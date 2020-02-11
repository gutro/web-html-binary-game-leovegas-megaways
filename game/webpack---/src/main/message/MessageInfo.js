import { Validator } from 'jsonschema'

/**
 * Class representing the MessageInfo
 *
 * @class
 */
export default class MessageInfo {

  /**
   * @param {Node} the message Node
   * @constructor
   */
  constructor(node) {
    this.messageNode = node;
    this.MESSAGE = {}
    this.validator = new Validator();
  }


  /**
   * Gets the Message from the message Xml element
   *
   * @function
   * @public
   */
  getMessageFromXml() {
    throw new Error('Abstract function getMessageFromXml is not implemented');
  }

  /**
   * Sets the Message
   *
   * @function
   * @public
   * @param {Object} Generic message representation
   */
  setMessage(message) {
    this.validateMessage(message);
    this.MESSAGE = message;
  }

  /**
   * Validates the Message
   *
   * @function
   * @public
   * @param {Object} Generic message representation
   */
  validateMessage(message) {
    throw new Error('Abstract function validateMessage with paramter message=' + message + ' is not implemented');
  }
}



// WEBPACK FOOTER //
// ./src/main/message/MessageInfo.js