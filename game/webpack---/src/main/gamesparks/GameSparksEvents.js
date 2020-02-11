import GSPlayer from './GSPlayer';
import {NotificationHandler} from '../NotificationHandler';
import {GCMNotification} from '../GCMNotification';

import axios from 'axios';
import GameSparks from './GameSparksExtend';

/**
 * @class
 * GameSparksEvents is the main class that manages GameSparks Actions.
 * Includes the implementation of all the gamesparks' callbacks (onNonce, onInit, onAuthenticate, onMessage)
 *
 * @constructor
 */
export default class GameSparksEvents {

  constructor() {
    this.gameSparks = null;
    this.gameName = null;

    this.notificationHandler_ = null;
    this.challengesNotificationHandler = null;
    this.ogsParams = null;
    this.opConfig = null;
  }

  /**
   * Set the Notification Handler Object
   * @param {NotificationHandler} notificationHandler_
   */
  setNotificationHandle(notificationHandler_) {
    this.notificationHandler_ = notificationHandler_;
  }

  setChallengesNotificationHandler(notificationHandler){
      this.challengesNotificationHandler = notificationHandler;
  }

  /**
   * Set the GameSparks Object
   * @param {GameSparks} gameSparks
   */
  setGameSparks(gameSparks) {
    this.gameSparks = gameSparks;
  }

  /**
   * Set the game name
   * @param {String} gameName
   */
  setGameName(gameName) {
    this.gameName = gameName;
  }

  /**
   * Set the ogs params
   * @param {Object} ogsParams
   */
  setOgsParams(ogsParams) {
    this.ogsParams = ogsParams;
  }

  /**
   * Set the Operator's configuration
   * @param {Object} opConfig
   */
  setOpConfig(opConfig) {
    this.opConfig = opConfig;
  }

  /**
   * GameSparks onNonce callback it triggers the GameSparks.sendAuthConnectWithHmac by providing the generated hmac.
   * @param {String} nonce The nonce key.
   */
  onNonce(nonce) {
    // Build the getauthkey url.
    const url = buildAuthkeyUrl(this.opConfig.gsUrl);
    // Set auth data.
    const authData = {
      "nonce" : nonce,
      "operatorid" : this.ogsParams.operatorid
    }
    // Getauthkey - Request to gs-registration Service
    return getAuthKey(url, authData).then(response => {
            if (typeof response.authKey !== 'undefined') {
              //console.log("authkey:" + response.authKey);
              this.gameSparks.sendAuthConnectWithHmac(response.authKey);
            } else {
              throw Error('GS Authentication has been failed.');
            }
          }).catch(e => {
            console.error(e);
            // Disconnect from GS Websocket.
            this.gameSparks.disconnect();
          });
  }

  /**
   * GameSparks onInit callback is triggered since we have a successful WebSocket Connection with the Gamesparks Platform.
   * Following up registration and authentication processes of the ogs customer with gamesparks.
   */
  onInit() {
    console.log('GameSparks onInit');

    // Register player - Request to gs-registration Service
    this.registerPlayer().then(player => {
       //console.log('player ' + JSON.stringify(player));
       // Authenticate player
       this.authenticatePlayer(player);
    }).catch(e => {
       console.error(e);
       // Disconnect from GS Websocket.
       this.gameSparks.disconnect();
    });
  }

  /**
   * Register the ogs customer with the Gamesparks platform.
   * @return {GSPlayer} The created GSPlayer Object.
   */
  registerPlayer() {
    // Set Customer's data.
    const customerData = {
      "sessionid" : this.ogsParams.sessionid,
      "operatorid" : this.ogsParams.operatorid,
      "gameid" : this.gameName
    }

    // Build the registration url
    const url = buildRegistrationUrl(this.opConfig.gsUrl);

    return sendRegisterRequest(url, customerData).then(response => {
      console.log('response: ' + JSON.stringify(response))
      if (typeof response.responseStatus !== 'undefined' &&
        response.responseStatus == 'OK')
       return new GSPlayer(response.cau, response.cap);
      else {
        throw Error('GS Registration has been failed.');
      }
    }).catch(e => {
      console.error(e);
      throw Error('GS Registration has been failed.');
    });
  }

  /**
   * Authenticate the ogs customer with the Gamesparks platform.
   */
  authenticatePlayer(player) {
    const request = {
      userName : player.userName,
      password : player.password
    };
    //console.log('Request: ' + JSON.stringify(request))
    this.gameSparks.sendWithData('AuthenticationRequest', request, this.onAuthenticate.bind(this));
  }

  /**
   * GameSparks onMessage callback is triggered since the Gamesparks Platform sends a message to the client.
   * We do a validation against the message code and we push the message to notification handler.
   *
   * @param {Object} message The Gamesparks message.
   */
  onMessage(message) {
      console.log("gamesparks onMessage " + JSON.stringify(message));
      if (message && message.data) {
          if (message.data.FEATURE === "Missions") {
             if(message.extCode=="MissionStartJoinedMissionComplete" || message.extCode=="MissionStartJoinedMissionCompleteWithReward"){
                  message.extCode = 'missionComplete';
              }
              else if(message.extCode.startsWith("Mission")){
                  message.extCode = 'missionStatus';
              }
              if (typeof message.extCode !== 'undefined' &&
                  (message.extCode === 'badgeWon' ||
                      message.extCode === 'missionComplete' ||
                      message.extCode === 'missionStatus')) {
                  this.notificationHandler_.handleNotification(new GCMNotification(GCMNotification.TYPE.GS_MESSAGE, message));
              }
          } else if (message.data.FEATURE === "Challenges") {
              this.challengesNotificationHandler(message);
          } else if (typeof message.error !== 'undefined') {
              console.error("GameSparks error: " + JSON.stringify(message));
              // If the error it comes from an Authentication action, disconnect from the Websocket.
              if (message['@class'] === '.AuthenticationResponse' ||
                  message['@class'] === '.AuthenticatedConnectResponse') {
                  // Disconnect from GS Websocket.
                  this.gameSparks.disconnect();
              }
          }
      }
  }

  /**
   * GameSparks onAuthenticate callback is triggered since we have successfully authenticate an ogs customer with the Gamesparks Platform.
   * It sends the on Authenticate Event on Gamesparks platform.
   *
   * @param {Object} message The Gamesparks message.
   */
  onAuthenticate(response) {
    if (typeof response.userId !== 'undefined') {
    var lang = 'en';
    if(this.ogsParams.lang != undefined && this.ogsParams.lang != "" && this.ogsParams.lang != null){
        lang = this.ogsParams.lang.split('_')[0];
    }
      // Get mission status
      const request = {
        eventKey : 'FEATURE_STATUS',
        gameName : this.gameName,
        operatorId: parseInt(this.ogsParams.operatorid),
        playerCurrency: this.ogsParams.currency,
        lang:lang
      };
      this.gameSparks.sendWithData('LogEventRequest', request, this.onMessage.bind(this));
    }
    console.log('onAuthenticate: ' + JSON.stringify(response));
  }

  onChallengePlayerAction(action){

    if(action){
      const request = {
        eventKey: 'TOURNAMENT_ACTION',
        action: action,
        gameName: this.gameName,
          operatorId: parseInt(this.ogsParams.operatorid)
      }

      this.gameSparks.sendWithData('LogEventRequest', request, this.onMessage.bind(this));
    }
    console.log("On Challenge Player Action ", action, " => ", JSON.stringify(action));
  }

   onMissionPlayerAction(action){

      if(action){
        const request = {
          eventKey: 'MISSION_ACTION',
          action: action,
          gameName: this.gameName,
          operatorId: parseInt(this.ogsParams.operatorid)
        }

        this.gameSparks.sendWithData('LogEventRequest', request, this.onMessage.bind(this));
      }
      console.log("On Mission Player Action ", action, " => ", JSON.stringify(action));
    }

  onGetServerTime(){
      const request = {
          eventKey: 'GET_TIME'
      }
      this.gameSparks.sendWithData('LogEventRequest', request, this.onMessage.bind(this));
      console.log("Get Server Timestamp");
  }
};

/**
 * @private
 * Build the registration Url.
 * @param {String} baseUrl The base url of the registration service.
 * @return {String} The registration Url.
 */
function buildRegistrationUrl(baseUrl) {
  return baseUrl + '/register';
}


/**
 * @private
 * Send the registration request.
 * An Ajax post request that sends the customer's json data.
 * eg.
 * {
 *  	"sessionid" : "ogsopenbet1",
 *  	"operatorid" : "1",
 *  	"gameid": "70044"
 * }
 * @param {String} url The registration Url.
 * @param {Object} customerData The data of the customer.
 * @return {Object} The registration response data.
 * eg.
 * {
 *     "responseStatus": "OK",
 *     "cau": "eec622a5bd8b85b520ab332aaa5ebbe3cdcb4e3239ae13c6266ddb3e67a67837",
 *     "cap": "f05e6cb728478334b353dc6541007683329b38206225abdd0f9d35d3a9205c54"
 * }
 */
function sendRegisterRequest(url, customerData) {
  return axios.post(url, customerData).then(response => {
    console.log('response: ' + JSON.stringify(response.data));
    return response.data;
  }).catch(e => {
    throw e;
  });
}

/**
 * @private
 * Build the authkey Url.
 * @param {String} baseUrl The base url of the registration service.
 * @return {String} The authkey Url.
 */
function buildAuthkeyUrl(baseUrl) {
  return baseUrl + '/getauthkey';
}

/**
 * @private
 * Send the authkey request.
 * An ajax post request that sends the nonce and operator id.
 * eg.
 * {
 *  	"nonce" : "3479e312-3ee9-4cf6-9ce8-cfcdd96b3c64",
 *  	"operatorid" : "1"
 * }
 * @param {String} url The authkey Url.
 * @param {Object} authData The data that includes the nonce and operatorid.
 * @return {Object} The authkey response data.
 * eg.
 * {
 *     "responseStatus": "OK",
 *     "authKey": "g+uXmoyOWQn8wuAktL3aEWExwdUQLjJTSwUr6BnWBQ8="
 * }
 */
function getAuthKey(url, authData) {
  return axios.post(url, authData).then(response => {
      console.log('response: ' + JSON.stringify(response.data));
      return response.data
    }).catch(e => {
      throw e;
    });
}


// WEBPACK FOOTER //
// ./src/main/gamesparks/GameSparksEvents.js