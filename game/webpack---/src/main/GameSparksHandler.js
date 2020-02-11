import GameSparks from './gamesparks/GameSparksExtend';
import GameSparksEvents from './gamesparks/GameSparksEvents';

/**
 * @class
 * This GameSparksHandler is a singleton class.

 * This class manages GameSparks Actions.
 *
 * @constructor
 */
export class GameSparksHandler {

  constructor() {
    //console.log('in gs handler constructor +');
    this.gameSparks = new GameSparks();

    this.gameSparksEvents = new GameSparksEvents();

    this.gcmOrigin = null;
  }

  /**
   * Initialize gamesparks by providing a config. There are two modes to initialize gamesparks the preview and the live.
   * The live should be used only for production.
   *
   * @param {Object} ogsParams These are the standard list of parameters that OGS passes to game providers.
   * @param {Object} notificationHandler_ The notification handler Object.
   * @param {Object} opGsConfig The operetor's gamesparks configuration.
   */
  init(gcmRef, ogsParams, notificationHandler_, widgetNotificationHandlers, opGsConfig) {

    this.gcmOrigin = gcmRef.launcherOrigin;

    console.log('GameSparks initialization.');

    this.gameSparksEvents.setNotificationHandle(notificationHandler_);

    if(widgetNotificationHandlers.challengeNotificationHandler)
      this.gameSparksEvents.setChallengesNotificationHandler(widgetNotificationHandlers.challengeNotificationHandler);


    const gsConfig = this.buildGamesparksConfig(opGsConfig);

    if (typeof opGsConfig.mode !== 'undefined' &&
      opGsConfig.mode === 'live')
      this.gameSparks.initLive(gsConfig);
    else
      this.gameSparks.initPreview(gsConfig);

    this.gameSparksEvents.setGameName(ogsParams.ogsgameid);
    this.gameSparksEvents.setGameSparks(this.gameSparks);
    this.gameSparksEvents.setOgsParams(ogsParams);
    this.gameSparksEvents.setOpConfig(opGsConfig);
  }

  onChallengePlayerAction(action){
    this.gameSparksEvents.onChallengePlayerAction(action);
  }
  onMissionPlayerAction(action){
    this.gameSparksEvents.onMissionPlayerAction(action);
  }

  onGetServerTime(){
    this.gameSparksEvents.onGetServerTime();
  }

  /**
   * Initialize gamesparks by providing a config. There are two modes to initialize gamesparks the preview and the live.
   * The live should be used only for production.
   *
   * @param {Object} opGsConfig The operetor's gamesparks configuration.
   * @return {Object} Returns the gamesparks configuration.
   */
  buildGamesparksConfig(opGsConfig) {
    const gsConfig = {
      key: opGsConfig.apiKey,
      onNonce: this.gameSparksEvents.onNonce.bind(this.gameSparksEvents),
      onInit: this.gameSparksEvents.onInit.bind(this.gameSparksEvents),
      onMessage: this.gameSparksEvents.onMessage.bind(this.gameSparksEvents),
      logger: console.log
    }
    return gsConfig;
  }
}

/**
 * Create and export singleton
 */
const instance = new GameSparksHandler();
export default instance


// WEBPACK FOOTER //
// ./src/main/GameSparksHandler.js