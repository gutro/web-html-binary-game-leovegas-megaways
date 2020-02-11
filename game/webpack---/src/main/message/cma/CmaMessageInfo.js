import MessageInfo from '../MessageInfo'
import { CmaMessage, jsonSchema } from './CmaMessage'
import CmaOption from './CmaOption'

/**
 * Class representing a CMA Message Info
 *
 * @class
 */
export default class CmaMessageInfo extends MessageInfo {

  /**
   * @param {Node} the message Node.
   * @constructor
   */
  constructor(node) {
    super(node);
  }

  /**
   * Sets CmaMessage from the message Xml element
   *
   * @function
   * @public
   * @returns {CmaMessage} {@link CmaMessage}
   */
  getMessageFromXml() {
    try {
      const id = this.messageNode.getAttribute('id')
      const title = this.messageNode.getElementsByTagName('TITLE')[0].childNodes[0].nodeValue;
      const text = this.messageNode.getElementsByTagName('TEXT')[0].childNodes[0].nodeValue;
      const message = new CmaMessage(id, title, text);
      if (this.messageNode.getElementsByTagName('OPTIONS').length > 0) {
        const optionsArr = Array.from(this.messageNode.getElementsByTagName('OPTIONS')[0].childNodes);
        message.setOptions(getOptionsFromXml(optionsArr));
      }
      return message;
    } catch(err) {
      throw new Error('CMA Message XML is not valid');
    }
  }

  /**
   * Validates the Message
   *
   * @function
   * @public
   * @param {CmaMessage} {@link CmaMessage}
   */
  validateMessage(message) {
    const errors = this.validator.validate(message, jsonSchema).errors;
    if (errors.length !== 0) {
      throw new Error('Invalid CMA message: ' + errors[0].stack);
    }
  }
}


/**
 * Returns Array of hte Cma Options from the options Xml element
 *
 * @function
 * @private
 * @param {Array} options Node
 * @returns {Array#CmaOption} CmaMessage options
 */
function getOptionsFromXml(options) {
  let optionsArr = new Array();
  options.map(function(op){
    if (op.nodeName !== '#text') {
      const id = op.getAttribute('id');
      const action = op.getAttribute('action');
      const body = op.childNodes[0].nodeValue;
      optionsArr.push(new CmaOption(id, action, body));
    }
  });
  return optionsArr;
}










// WEBPACK FOOTER //
// ./src/main/message/cma/CmaMessageInfo.js