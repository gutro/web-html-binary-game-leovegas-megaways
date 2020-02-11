/**
 * Copyright OpenBet Technologies Ltd, 2016, All rights reserved.
 */

/**
 * @private
 */
const COOKIE_NAME = 'OpenbetLogger'
const COOKIE_REGEX = new RegExp('(^|; )' + COOKIE_NAME + '=([^;]*)')

/**
 * @class OpenbetLogger
 *
 * @desc
 * OpenbetLogger is a logging module designed to be used by applications that
 * want to include support logging but do not wish to have this always occur.
 * Instead you must opt-in to the logging by either setting a cookie,
 * `OpenbetLogger` to any value, or setting a variable in the browser -
 * `window.OpenbetLogger` to the value `true`.
 *
 */
export default class OpenbetLogger {

  /**
   * @method
   * @name constructor
   * @param {string} prefix - The log prefix to use for all logging coming from
   *  this instance
   */
  constructor(prefix = 'default') {

    // prefix to include with each line, intended to allow quick filtering on
    // lines of interest
    this.prefix = prefix

    // no logging happens by default
    this.enabled = false

    // check for the methods we want to use existing in the browser
    const fallback = console && console.log ? console.log : undefined

    this.logger = {
      error: {
        scope: console,
        func: console && console.error ? console.error : fallback
      },
      warn: {
        scope: console,
        func: console && console.warn ? console.warn : fallback
      },
      info: {
        scope: console,
        func: console && console.info ? console.info : fallback
      }
    }

    // check if a logging is enabled or not
    this.enabled = isLoggingEnabled()

  }


  /**
   * Log an error level message
   *
   * @param {...*} ...args - a string with optional placeholders followed by
   *   values to be substituted (follows the same rules as console.log)
   */
  error(...args) {
    this._log('error', args)
  }


  /**
   * Log a warning level message
   *
   * @param {...*} ...args - a string with optional placeholders followed by
   *   values to be substituted (follows the same rules as console.log)
   */
  warn(...args) {
    this._log('warn', args)
  }


  /**
   * Log an info level message
   *
   * @param {...*} ...args - a string with optional placeholders followed by
   *   values to be substituted (follows the same rules as console.log)
   */
  info(...args) {
    this._log('info', args)
  }


  /**
   * @private
   *
   * Invoke the appropriate logger
   *
   * @param {string} level - log level desired, expecting one of `error`, `warn`
   *   or `info`.
   * @param {...*} ...args - a string with optional placeholders followed by
   *   values to be substituted (follows the same rules as console.log)
   */
  _log(level, args) {

    // check logging is ok
    if (!this.enabled && !window.OpenbetLogger) {
      return
    }

    // call appropriate logger
    const {
      scope,
      func
    } = this.logger[level]

    if (scope && func) {
      args[0] = `${this.prefix} :: ${args[0]}`
      func.apply(scope, args)
    }

  }

}

/**
 * @private
 *
 * Checks if the code is executed in node or browser based on document object availability.
 * If document is available it treats it is in browser environment and check for cookie existence and regex match
 * to enable logging.
 * If document is unavailable it is being executed in node environment where logging is enabled by default
 *
 * @returns {boolean} - true if the cookie is in place denoting logging should
 *   occur
 */
function isLoggingEnabled() {
  return typeof document === 'undefined' ? true : COOKIE_REGEX.test(document.cookie)
}


// WEBPACK FOOTER //
// ../src/index.js