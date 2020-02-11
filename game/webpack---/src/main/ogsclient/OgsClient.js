import axios from 'axios';
import {Promise} from 'es6-promise';

 /**
  * Provides the methods to communicate with the OGS Client API.
  *
  * @class
  */
export class OgsClient {

    constructor(){
    }

    /**
     * OgsClient init
     *
     * @param {Object} ogsClientConfiguration The Ogs Client configuration
     * @param {Object} ogsParams  These are the standard list of parameters that OGS passes to game providers.
     */
    init(ogsClientConfiguration, ogsParams) {
        this.url = ogsClientConfiguration.url;
        this.basePath = "ogsclient";
        this.ogsParams = ogsParams;
        this.axiosClient = axios.create({});
    }

    /**
     * Builds and returns the Ogs Client API base uri.
     *
     * @private
     */
    buildBaseUri() {
        return this.url + "/" + this.basePath;
    }

    /**
     * Builds and returns OGS Client API endpoint for the token retrieval.
     *
     * @private
     */
    buildLiveServAuthenticationUri() {
        return this.buildBaseUri() + "/getliveservtoken";
    }

    /**
     * Performs a call to the OGS Client API getliveservtoken endpoint.
     * On success returns the Liveserv Token and the Channel Id.
     * On failure returns the error message.
     *
     * @param {Object} ogsClientToken - require information for liveServ
     *
     * @returns {Promise} Promise object that contains the Liveserv auth token and the channel id, or an Error if rejected
     */
    getLiveServToken(ogsClientToken) {
        const url = this.buildLiveServAuthenticationUri();
        const params = {
            "opId": this.ogsParams.operatorid,
            "device": this.ogsParams.device,
            "currency": this.ogsParams.currency,
            "gpGameId": this.ogsParams.gameid,
            "ogsClientToken": ogsClientToken
        };

        return this.axiosClient
            .post(url, params)
            .then(response => {
                if(response.data.rc == 0) return response.data;
                else Promise.reject(error.response.data);
            })
            .catch(error => {
                if(error.response != undefined) {
                    switch (error.response.status) {
                        case 401:
                            return Promise.reject(error.response.data);
                    }
                }
                return Promise.reject(error);
            });
    }

}
export default OgsClient;


// WEBPACK FOOTER //
// ./src/main/ogsclient/OgsClient.js