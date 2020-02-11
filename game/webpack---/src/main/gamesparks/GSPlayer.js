/*
 * Data model for a Game Sparks Player
 *
 * @class
 */
export default class GSPlayer {

  /**
   * @param {String} username
   * @param {String} password
   *
   * @constructor
   */
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }
};


// WEBPACK FOOTER //
// ./src/main/gamesparks/GSPlayer.js