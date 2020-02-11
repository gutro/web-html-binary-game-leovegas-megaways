/**
 * Constant defining the list of supported message types
 */
export const SupportedMessageTypes = {
  RC : '100',
  CMA : '101'
};

/**
 * Check that a message type is valid
 *
 * @function
 * @private
 */
export function isValidMessageType(messageId) {
  let valid = false;

  Object.keys(SupportedMessageTypes).forEach(function(key) {
    if (SupportedMessageTypes[key] === messageId) {
      valid = true;
    }
  })

  if (!valid) {
    throw new Error('Invalid message type (Message Id: "' + messageId + '"');
  }
}


// WEBPACK FOOTER //
// ./src/main/message/MessageType.js