import MessageInfo from '../MessageInfo'
import { RcMessage, jsonSchema } from './RcMessage'
import RcOption from './RcOption'

/**
 * Class representing a Reality Check Message Info
 *
 * @class
 */
export default class RcMessageInfo extends MessageInfo {

  /**
   * @param {Node} node, the message Node.
   * @constructor
   */
  constructor(node) {
    super(node);
  }

  /**
   * Converts the XML message specified by {node} in the constructor to
   * a {RcMessage} representation.
   *
   * @function
   * @public
   * @returns {RcMessage} {@link RcMessage}
   */
  getMessageFromXml() {
    if(isSyncMessage(this.messageNode)) {
      return null;
    }

    try {
      const id = this.messageNode.getAttribute('id');
      let type;
      if (this.messageNode.getElementsByTagName('TYPE').length > 0) {
        type = this.messageNode.getElementsByTagName('TYPE')[0].childNodes[0].nodeValue;
      }
      const title = this.messageNode.getElementsByTagName('TITLE')[0].childNodes[0].nodeValue;
      const text = this.messageNode.getElementsByTagName('TEXT')[0].childNodes[0].nodeValue;
      const message = new RcMessage(id, type, title, text);
      if (this.messageNode.getElementsByTagName('OPTIONS').length > 0) {
        const optionsArr = Array.from(this.messageNode.getElementsByTagName('OPTIONS')[0].childNodes);
        message.setOptions(getOptionsFromXml(optionsArr));
      }
      return message;
    } catch(err) {
      throw new Error('RC Message XML is not valid: ' + err.message);
    }
  }

  /**
   * Validates the Message
   *
   * @function
   * @public
   * @param {RcMessage} {@link RcMessage}
   */
  validateMessage(message) {
    const errors = this.validator.validate(message, jsonSchema).errors;
    if (errors.length !== 0) {
      throw new Error('Invalid RC message: ' + errors[0].stack);
    }
  }
}

/**
 * Check if RC is a sync message
 *
 * @function
 * @private
 * @param {Node} messageNode the message Node.
 * @returns {boolean} true if the message is a sync message (ignore),
 *  false if it is a default RC message
 */
function isSyncMessage(messageNode) {
  if (messageNode)
    return (messageNode.getElementsByTagName('SESSIONTIME').length > 0) ? true : false;

  return false;
}

/**
 * Returns Array of hte Rc Options from the options Xml element
 *
 * @function
 * @private
 * @param {Array} options Node
 * @returns {Array#RcOption} RcMessage options
 */
function getOptionsFromXml(options) {
  let optionsArr = new Array();
  options.map(function(op) {
    if (op.nodeName !== '#text') {
      const id = op.getAttribute('id');
      const action = op.getAttribute('action');
      const body = op.childNodes[0].nodeValue;
      optionsArr.push(new RcOption(id, action, body));
    }
  });
  return optionsArr;
}










// WEBPACK FOOTER //
// ./src/main/message/rc/RcMessageInfo.js