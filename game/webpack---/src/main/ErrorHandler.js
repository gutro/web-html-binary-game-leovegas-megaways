import { NotificationHandler } from './NotificationHandler';
import { Validate } from './Validate';
import { fogerrorCode, errorCategory as errorCategoryTypes, errorSeverity as errorSeverityTypes } from './errormap.js';
import { ErrorNotification } from './ErrorNotification';

export class ErrorHandler {
  constructor() {
    /**
     * @private
     * @type {NotificationHandler}
     * A reference to singleton instance gcm.notification.NotificationHandler, the constructor will
     * return a reference to the singleton instance.
     * */
    this.notificationHandler_ = new NotificationHandler();
  }

 isRealityCheckError(error) {
    console.log("ErrorHandler.isRealityCheckError(error) error: "+error);
    if (error == null || error.search(errorCategoryTypes.REALITY_CHECK) == -1) {
      return false;
    } else {
      return true;
    }
  }

  handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams) {

    if (!Validate.isEnumOption(errorCategoryTypes, errorCategory)) {
      errorCategory = errorCategory.NON_RECOVERABLE_ERROR;
    }
    if (!Validate.isEnumOption(errorSeverityTypes, errorSeverity)) {
      errorSeverity = errorSeverity.ERROR;
    }
    if (!Validate.isDefinedAndNotNull(errorCode)) {
      errorCode = 'UNKNOWN';
    }

    if (!Validate.isDefinedAndNotNull(errorMessage)) {
      errorMessage = 'An unexpected error has occurred. Please try again.';
    }

    if (errorParams != null) {
      if (!(typeof errorParams === 'object')) {
        throw new Error('gcm.handleError: Invalid errorParams type');
      }
    }

    this.notificationHandler_.handleNotification(new ErrorNotification(errorCategory,
      errorSeverity, errorCode, errorMessage, errorParams));
  }
}




// WEBPACK FOOTER //
// ./src/main/ErrorHandler.js