/**
 * */
//goog.provide('gcm.event.GCMEvent');

/**
 * @class
 * Model data of Event Object. Which is used by any EventDispatcher Object.
 *
 * @see EventDispatcher
 *
 * @constructor
 *
 * @param {string} name Event string.
 * @param {*=} body (Optional) Event body, can be ignored.
 *
 * @property {string} name Event name, used when adding event listeners.
 * @property {*} body Event body, can be null.
 */

const TYPE = {
  ERROR: 'ERROR',
  SESSION_TIMER: 'SESSION_TIMER',
  SESSION_STATS: 'SESSION_STATS',
  BONUS_BAR: 'BONUS_BAR',
  BONUS_BAR_FILLED: 'BONUS_BAR_FILLED',
  FREEBET_REWARD: 'FREEBET_REWARD'
};

const COMPLETE = 'complete';

export class GCMEvent {
  constructor(name, body) {
    this.name = name;
    this.body = body;
    this.target = null;
  }

  static get TYPE() {
    return TYPE;
  }

  static get COMPLETE() {
    return COMPLETE;
  }
}




// WEBPACK FOOTER //
// ./src/main/GCMEvent.js