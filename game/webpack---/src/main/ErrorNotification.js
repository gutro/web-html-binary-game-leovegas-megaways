/**
 * @author xliu
 * Date: 30/04/13
 */
//goog.provide('gcm.notification.model.ErrorNotification');
//goog.require('gcm.notification.model.GCMNotification');
//goog.inherits(ErrorNotification, GCMNotification);
/**
 * @class This is data model of GCM error notification.
 * @extends GCMNotification
 * This is data model for Error notification. 

 * The type of session stats notification is 'ERROR'.
 * The body of this notification should be in the format of:
 *     
 *       {
 *         errorCategory: string
 *         errorSeverity: string
 *         errorCode: string
 *         errorMessage: string
 *         errorParams: object
 *       }
 *     

 *
 * @constructor
 * @param {string} errorCategory the category of current error.
 *                 The current error categories are:
 *                 {
 *                     CRITICAL,
 *                     INSUFFICIENT_FUNDS,
 *                     LOGIN_ERROR,
 *                     RECOVERABLE_ERROR,
 *                     NON_RECOVERABLE_ERROR,
 *                     CONNECTION_ERROR,
 *                     MULTI_CHOICE_DIALOG,
                       OTHER_GAME_IN_PROGRESS
 *                 }.
 * @param {string} errorSeverity this signifies the severity of the error and can
 *          be 'WARNING', 'INFO' or 'ERROR'.
 * @param {string} errorCode the error code string. Note that usually nothing
 *          should be done with this parameter. The commonUI is not expected to
 *          do any business logic based on the error code, but it is passed
 *          through in case the commonUI wishes to log the error codes that
 *          have been sent.
 * @param {string} errorMessage the error message provide by game.
 * @param {Object=} errorParams (Optional) JSON object parameter to allow game to pass additional
 *          information to the commonUI on how to handle the error. Key,value pairs
 *          must be provided in a valid JSON format.
 *          e.g {'suppressMessage':'true'}.
 * */

import { GCMNotification } from './GCMNotification';

export class ErrorNotification extends GCMNotification {

  constructor(errorCategory, errorSeverity, errorCode, errorMessage, errorParams) {
    const errorBody = {
      'errorCategory': errorCategory,
      'errorSeverity': errorSeverity,
      'errorCode': errorCode,
      'errorMessage': errorMessage,
      'errorParams': errorParams
    };

    super(GCMNotification.TYPE.ERROR, errorBody, ErrorNotification.setErrorParamIndex);
  }

  /**
   * Sets error param index
   * @param {*} errorParamIndex Index to be set.
   */
  static setErrorParamIndex(errorParamIndex) {
    ErrorNotification.gameErrorParamIndex = errorParamIndex;
  };

  /**
   * Retrieves error param index.
   * @return {*} The error param index.
   */
  static getErrorParamIndex() {
    return ErrorNotification.gameErrorParamIndex;
  };
}


// WEBPACK FOOTER //
// ./src/main/ErrorNotification.js