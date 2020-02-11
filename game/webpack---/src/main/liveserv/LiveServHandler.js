import { LiveServConnection } from './LiveServConnection';
import { GCMNotification } from '../GCMNotification'
import { GcmStorage } from "../GcmStorage";

/**
 * enumerate of liveserv notification types
 * @enum {string}
 * */
const SUBJECT_ID = {
    SJPWIN: 'SJPWIN' // Syndicated Jackpot Win
};

 /**
  * Main class to liveserv actions
  *
  * @class
  */
export class LiveServHandler {
    constructor() {
        this.gcmStorage = new GcmStorage();
    }

     /**
      * Initialize LiveServ by providing a config
      *
      * @param {Object} gcmRef Gcm Reference
      * @param {Object} notificationHandler_ The notification handler Object.
      * @param {Object} lsConfiguration The operator's liveserv configuration.
      * @param {Object} lsAuth The liveserv auth object, containing the auth token and the channel id.
      */
    init(gcmRef, notificationHandler_, lsConfiguration, lsAuth) {
        this.gcm_ = gcmRef;
        this.notificationHandler = notificationHandler_;
        this.liveServConnection = this.createLiveServConnection(lsConfiguration, lsAuth.authToken);
        this.autheticateToLiveServ(lsAuth.authToken);
        this.subscribeToLiveServChannel(lsAuth.channelId, this.handleLiveServNotification.bind(this));
    }

    /**
     * Establish a LiveServ Connection
     * 
     * @param {Object} lsConfiguration The operator's liveserv configuration. 
     * @param {String} authToken LiveServ authorization token
     */
    createLiveServConnection(lsConfiguration, authToken) {
        return new LiveServConnection(lsConfiguration, authToken);
    }

    /**
     * Authenticates to LiveServ
     * 
     * @param {String} authToken LiveServ authorization token
     */
    autheticateToLiveServ(authToken) {
        this.liveServConnection.authenticate(authToken);
    }

    /**
     * Subscribes to LiveServ channel  
     * 
     * @param {String} channelId The LiveServ channel 
     * @param {Callback} handleLiveServNotification The notification handler
     */
    subscribeToLiveServChannel(channelId, handleLiveServNotification) {
        this.liveServConnection.subscribe(channelId, handleLiveServNotification);
    }

    /**
     * Pass the liveserv messages to the Notification Handler
     *
     * @param {Object} message The liveserv message
     */
    handleLiveServNotification(message) {
        console.log('received message %o', message);
        if (message && message.subject) {
            if (message.subject.startsWith(SUBJECT_ID.SJPWIN)) {
                console.log(GCMNotification.TYPE.SYNDICATED_JACKPOT_WIN_AWARD, message.payload);
                const notification = new GCMNotification(GCMNotification.TYPE.SYNDICATED_JACKPOT_PROGRESS_BAR, {});
                this.notificationHandler.disposeNotification(notification);
                if (!this.gcmStorage.hasSyndicatedMessageBeenShow(message.msg_id)) {
                    this.gcm_.syndicateJackpotWinAwardDialogIsOpen = true;
                    this.notificationHandler.handleNotification(new GCMNotification(GCMNotification.TYPE.SYNDICATED_JACKPOT_WIN_AWARD, message.payload));
                    this.gcmStorage.appendShownSyndicationMessage(message.msg_id)
                }
            } else {
                console.log("Unknown Notification");
            }
        }
    }
}
export default LiveServHandler;


// WEBPACK FOOTER //
// ./src/main/liveserv/LiveServHandler.js