import XmlUtil from '../utils/XmlUtil'
import MessageInfoFactory from './MessageInfoFactory'
import * as MessageType from './MessageType'

/*
 * Class encapulating the message trigger functionality
 *
 * @class
 */

export class MessageTrigger {

  constructor() {
    // Called later in file to produce singleton
  }

  /**
   * Returns Message from the message Xml element.
   *
   * @function
   * @private
   * @param {String} message Node
   * @returns {Object} Message Object
   */
  getMessageFromXml(messageNodeStr) {
    if (messageNodeStr !== null) {
      const messageNode = getMessageNodeFromString(messageNodeStr);
      const id = messageNode.getAttribute('id');
      MessageType.isValidMessageType(id);
      const messageInfo = new MessageInfoFactory.createMessageInfo(id, messageNode);
      const message = messageInfo.getMessageFromXml();
      if (message) {
        messageInfo.setMessage(message);
      }
      return messageInfo.MESSAGE;
    }
  }

}

/**
 * Returns the message Node from the message Xml String.
 *
 * @function
 * @private
 * @param {string} messageNodeStr
 * @returns {Node} messageNode
 */
function getMessageNodeFromString(messageNodeStr) {
  try {
    const messageXml = XmlUtil.stringToXml(messageNodeStr);
    return messageXml.getElementsByTagName('MESSAGE')[0];
  } catch(err) {
    throw new Error('Invalid Message Xml.');
  }
}

/**
 * Create and export singleton
 */
const instance = new MessageTrigger();
export default instance


// WEBPACK FOOTER //
// ./src/main/message/MessageTrigger.js