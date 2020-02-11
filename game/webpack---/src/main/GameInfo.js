import { Validate } from './Validate';
/**
 *
 * This GameInfo is a singleton class for:
 *  - Manage game options, which is registered from game and will notify commonUI for the
 *    regitered options
 *  - Manage game display elements registration, (i.e. About Box), also commonUI will be notified
 *    for registered displays
 *  - Bypass game display information to commonUI (i.e. game loading percentage information)
 *  - Manage option change actions, keep game and gcm in consistency for any changed game option
 *    during game play.
 *
 * @author xliu
 * Date: 17/07/12
 * Time: 15:19
 * @namespace
 */

export class GameInfo {
  constructor() {

    this.game_ = null;
    this.commonUI_ = null;

    this.OptionTypes = {
      MUTE: 'MUTE',
      TURBO: 'TURBO',
      ABOUT: 'ABOUT',
      HELP: 'HELP',
      PAYTABLE: 'PAYTABLE',
      GAME_PREFERENCES: 'GAME_PREFERENCES',
      QUALITY: 'QUALITY',
      CLOTH_COLOR: 'CLOTH_COLOR',
      GAME_FEATURE: 'GAME_FEATURE',
      AMBIENCE_SOUND: 'AMBIENCE_SOUND'
    };

    this.PlayMode = {
        REAL: 'real',
        DEMO: 'demo'
    }

    this.options_ = {};
    this.defaultOptions_ = {};
    this.defaultOptions_[this.OptionTypes.MUTE] = false;
    this.defaultOptions_[this.OptionTypes.QUALITY] = 'HIGH';
    this.defaultOptions_[this.OptionTypes.CLOTH_COLOR] = 'BLUE';
  }

  setGame(game) {
    this.game_ = game;
  };

  /**
   * This is called when gcm-launcher passes gcmConfiguration via configure method on GCM
   * @param {GameInfo.OptionTypes} type Type of default option.
   * @param {boolean} value value of default option.
   */
  setDefaultOption(type, value) {
    this.defaultOptions_[type] = value;
  };

  /**
   * Retrieves the default value for a given type of property
   * @param {GameInfo.OptionTypes} type Type of the default option.
   * @return {string} The value associated for the given type.
   */
  getDefaultOption(type) {
    return this.defaultOptions_[type];
  };


  /**
   * This function is called by gcm to pass the reference of commonUI instance
   * @param {Object} commonUI A reference to commonUI.
   * */
  setCommonUI(commonUI) {
    this.commonUI_ = commonUI;

    // if gcm has already had options registered to it, then tell the commonUI
    //const typeKey;
    var typeKey;

    for (typeKey in this.options_) {
      this.commonUI_.regOption(typeKey, this.options_[typeKey]);
    }
  };

  optionHasChanged(optionType, changedFrom, newValue) {
    if (!(changedFrom === 'COMMONUI' || changedFrom === 'GAME')) {
      throw new Error(`gcm.optionHasChanged: changedFrom must be COMMONUI or GAME. Received ${changedFrom}`);
    }

    if (!Validate.isEnumOption(this.OptionTypes, optionType)) {
      throw new Error(`gcm.optionHasChanged: Unknown optionType ${optionType} in change request from ${changedFrom}`);
    }

    if (optionType === 'QUALITY' || optionType === 'CLOTH_COLOR') {
      if (this.options_[optionType] === '') {
        throw new Error(`else :gcm.optionHasChanged: option changed - ${optionType} - has not been registered: ${this.options_[optionType]}`);
      }
    } else {
      if (!Validate.isValidBoolean(newValue)) {
        throw new Error(`gcm.optionHasChanged: newValue must be boolean.  Received ${newValue}`);
      }
      if (!Validate.isValidBoolean(this.options_[optionType])) {
        throw new Error(`gcm.optionHasChanged: option changed - ${optionType} - has not been registered: ${options_[optionType]}`);
      }
    }

    this.options_[optionType] = newValue;

    if (changedFrom === 'GAME') {
      // tell the commonUI about the change
      this.commonUI_.optionHasChanged(optionType, newValue);
    } else if (changedFrom === 'COMMONUI') {
      // tell the game about the change
      this.game_.optionHasChanged(optionType, newValue);
    }
  };


  regOption(optionType) {

    if (!Validate.isEnumOption(this.OptionTypes, optionType)) {
      throw new Error(`gcm.regOption: Unknown optionType ${optionType}`);
    }

    if (this.options_[optionType] === undefined) {
      switch (optionType) {
        case this.OptionTypes.MUTE:
          this.options_[optionType] = this.defaultOptions_[this.OptionTypes.MUTE];
          break;
        case this.OptionTypes.TURBO:
          // turbo option should default to false
          this.options_[optionType] = false;
          break;
        case this.OptionTypes.QUALITY:
          this.options_[optionType] = this.defaultOptions_[this.OptionTypes.QUALITY];
          break;
        case this.OptionTypes.CLOTH_COLOR:
          this.options_[optionType] = this.defaultOptions_[this.OptionTypes.CLOTH_COLOR];
          break;
        default:
          this.options_[optionType] = false;
      }
    }
    // setup the option in the commonUI if the commonUI is available
    // otherwise we will tell the commonUI when the commonUI calls commonUIReady
    if (this.commonUI_) {
      this.commonUI_.regOption(optionType, this.options_[optionType]);
    }
    return this.options_[optionType];
  };

  /**
   * The game must call this on gcm so that the commonUI can be updated with
   * loading progress and display progress in a loading screen
   * @param {number} percentLoaded the percentage of the loading process complete.
   */
  loadProgressUpdate(percentLoaded) {

    if (!Validate.isPercentValue(percentLoaded)) {
      throw new Error(`gcm.loadProgressUpdate: Invalid percentLoaded value:${percentLoaded}`);
    }

    if (this.commonUI_) {
      this.commonUI_.loadProgressUpdate(percentLoaded);
    }
  };
}



// WEBPACK FOOTER //
// ./src/main/GameInfo.js