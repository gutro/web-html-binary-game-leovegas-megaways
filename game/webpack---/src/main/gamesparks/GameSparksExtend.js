import GameSparks from '../libs/gamesparks/gamesparks.js';
import CryptoJS from 'crypto-js';

/**
 * The GameSparksExtend module includes all the gamesparks' methods that have been overwritten
 * or any new method that have been added.
 */


/**
 * The gamesparks handshake method has been overwritten, in order the onNonce callback
 * to be able to get the hmac through ajax call.
 */
GameSparks.prototype.handshake = function(result) {
  if (result['nonce']) {
    var hmac;

    if (this.options.onNonce) {
      this.options.onNonce(result['nonce']);
    } else if (this.options.secret) {
      hmac = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(result['nonce'], this.options.secret));
      this.sendAuthConnectWithHmac(hmac);
    }
  } else if (result['sessionId']) {
    this.handshakeSessionId(result['sessionId']);
  }
}

/**
 * Handshake by providing the sessionId.
 */
GameSparks.prototype.handshakeSessionId = function(sessionId) {
  this.sessionId = sessionId;
  this.initialised = true;

  if (this.options.onInit) {
    this.options.onInit();
  }

  this.keepAliveInterval = window.setInterval(this.keepAlive.bind(this), 30000);
}

/**
 * Send AuthenticatedConnectRequest including the hmac.
 */
GameSparks.prototype.sendAuthConnectWithHmac = function(hmac) {
  var toSend = {
    '@class' : '.AuthenticatedConnectRequest',
    hmac : hmac
  };

  if (this.authToken) {
    toSend.authToken = this.authToken;
  }

  if (this.sessionId) {
    toSend.sessionId = this.sessionId;
  }

  const browserData = this.getBrowserData();
  toSend.platform = browserData.browser;
  toSend.os = browserData.operatingSystem;

  this.webSocketSend(toSend);
}

export default GameSparks;


// WEBPACK FOOTER //
// ./src/main/gamesparks/GameSparksExtend.js