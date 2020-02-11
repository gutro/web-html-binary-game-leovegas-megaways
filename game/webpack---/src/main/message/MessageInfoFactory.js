import CmaMessageInfo from './cma/CmaMessageInfo'
import RcMessageInfo from './rc/RcMessageInfo'
import * as MessageType from './MessageType'

/**
 * Message Info Constructors
 */
const MessageTypeConstructors = {
  [MessageType.SupportedMessageTypes.CMA]: CmaMessageInfo,
  [MessageType.SupportedMessageTypes.RC]: RcMessageInfo
};

/**
 * Class MessageInfoFactory
 *
 * @class
 */
export class MessageInfoFactory {

  constructor() {
    // Called later in file to produce singleton
  }

  /**
   * Creates the message based on the type
   *
   * @param {integer} messageId, the message type code
   * @param {Node} messageNode, the message node
   */
  createMessageInfo(messageId, messageNode) {
    const MessageInfoConstructor = MessageTypeConstructors[messageId];
    let messageInfo = null;
    if (MessageInfoConstructor) {
      messageInfo = new MessageInfoConstructor(messageNode);
    }
    return messageInfo;
  }
}

/**
 * Create and export singleton
 */
const instance = new MessageInfoFactory();
export default instance;


// WEBPACK FOOTER //
// ./src/main/message/MessageInfoFactory.js