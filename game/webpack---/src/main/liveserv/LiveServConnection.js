import { LiveServ } from '@sgd/liveserv-client'

const lastMessageId = '!!!!!!!!!!';

/**
 * Connects and authenticates to LiveServ, and 
 * subscribes to a LiveServ channel.
 * 
 * @class
 */
export class LiveServConnection { 

     /**
      * LiveServ Connection constructor.
      * Establishes a connection to LiveServ
      * 
      * @constructor
      * 
      * @param {Object} lsConfiguration The liveserv configuration object
      * @param {String} authToken The liveserv authorization token
      */
    constructor(lsConfiguration, authToken) {
        try {
            this.client = new LiveServ(
                [lsConfiguration.url],
                authToken,
                {
                    retries: lsConfiguration.retries,
                    cooldownSeconds: lsConfiguration.cooldownSeconds,
                    maxRetryDelaySeconds: lsConfiguration.maxRetryDelaySeconds
                },
                2
            );

            this.client.watchConnectionState(connInfo => this.watchConnection(connInfo));
        } catch (ex) {
            console.log(ex);
        }
    }

    /**
     * Authenticates to LiveServ
     * 
     * @param {String} authToken LiveServ authorization token
     */
    authenticate(authToken){
        if (this.client) this.client.authenticate(authToken);
    }

    /**
     * Subscribes to LiveServ channel  
     * 
     * @param {String} channel The LiveServ channel
     * @param {Object} handleNotification 
     */
    subscribe(channel, handleNotification) {
        if (this.client == null) return;
        this.client.subscribe(
            [channel],
            msg => handleNotification(msg),
            lastMessageId
        );
    }

    watchConnection(connInfo) {
        console.log(connInfo);
    }
        
} export default LiveServConnection;


// WEBPACK FOOTER //
// ./src/main/liveserv/LiveServConnection.js