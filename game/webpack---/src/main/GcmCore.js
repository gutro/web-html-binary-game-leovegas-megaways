import { GameStateController } from './GameStateController';
import { ErrorHandler } from './ErrorHandler';
import { GameInfo } from './GameInfo';
import { Validate } from './Validate';
import { NotificationHandler } from './NotificationHandler';
import { ErrorNotification } from './ErrorNotification';
import { GCMEvent } from './GCMEvent';
import { CUIAdapter } from './CUIAdapter';
import { GCMNotification } from './GCMNotification';
import { Promotions } from './promotions/Promotions';
import { MessageTrigger } from './message/MessageTrigger';
import { UrlUtil } from './utils/UrlUtil';
import { GameSparksHandler } from './GameSparksHandler';
import { LiveServHandler } from './liveserv/LiveServHandler';

import 'url-polyfill';

import {Promise} from 'es6-promise';
import axios from 'axios';
import WidgetUIAdaptor from "./WidgetUIAdaptor";
import OpenbetLogger from 'openbet-logger';
import OgsClient from "./ogsclient/OgsClient";

/**
 * GcmCore class.
 * GCMCore is the main GCM interface. This is exposed within the game window.
 * When gcm is referred to elsewhere it will be referring to this API.
 * GcmCore is loaded by game and once initialized, it is responsible for initiating loading of commonUI.
 * @class GcmCore
 * @constructor
 */
export class GcmCore {

    constructor() {
        this.account = {}; // stake, paid, balances{}
        this.ccyFormatter = null;

        this.game;             // Game object
        this.gameConfig = {};
        this.commonUI = null;  // CUIAdapter
        this.widgetUIAdaptor = null; //Feature Widget Adaptor
        this.operator = null;
        this.launcherOrigin = null;
        this.launcherHostName = null;
        this.commonUIOrigin = null;
        this.ogsParams = null;
        this.analyticsEnabled = false;
        this.isGameReady = false;
        this.isAccountInit= false;

        // gcmCore classes
        this.gameStateController_ = new GameStateController();
        this.notificationHandler_ = new NotificationHandler();
        this.errorHandler_ = new ErrorHandler();
        this.gameSparksHandler_ = new GameSparksHandler();
        this.gameInfo = new GameInfo();
        this.ogsClient = new OgsClient();
        //LiveServ handler
        this.liveServHandler = new LiveServHandler();

        this.launcherWindow = window.parent;

        this.messageTrigger = new MessageTrigger();

        //Internal property declaring whether promotions are enabled
        this.promotionsEnabled = false;
        this.promotions = new Promotions(this.notificationHandler_);

        this.playerCurrency = null;
        this.latestActiveJackpotIdentifiers = [];
        this.latestJackpotBalances = [];
        this.timer = null;

        this.syndicateJackpotWinAwardDialogIsOpen = false;

        this._logger = {integration: new OpenbetLogger('GCM Int'), debug: new OpenbetLogger('GCM Debug')};
    }

    /**
    * The game should call this init method on the gcm as soon as possible
    * Here we initiate loading of commonUI into commonUIIFrame.
    * @public
    * @param {Object} game this is the game object. gcmBridge will call gcmReady on
    *          it, once gcm is available.
    * @param {string} gcmUrlString the full url of gcm . This can vary based on OGS environment the game is connected to.
    * @param {string} gameUrlString is the full url of the game (or landing pg with params for 3rd Party Partner games). Query string params passed in from the OGS Launcher should be preserved.
    */
    init(gameObj, gcmUrlString, gameUrlString) {
        this._logger.integration.info("GCM.init(\n\tgameObj:", gameObj, "\n\tgcmUrlString:", gcmUrlString, "\n\tgameUrlString:", gameUrlString,"\n)");

        const gcmUrl = new URL(gcmUrlString);

        if(gameUrlString != "" && gameUrlString != undefined) {
            this.gameUrl = gameUrlString;
        }else {
            this._logger.debug.warn("init: parameter gameUrlString is missing");
        }

        this.device = UrlUtil.getSearchParameterByName('device', this.gameUrl);

        if(this.device == undefined || this.device == null || this.device != "mobile"){
            this.device = "desktop";
        }

        // gcm-core & gcm-launcher are always hosted together
        this.launcherOrigin = gcmUrl.origin;
        this.launcherHostName = gcmUrl.hostname;

        this.game = gameObj;

        addEventListener("message", this.postMessageEventListener.bind(this), false);

        let isDesktop = this.device == "desktop";

        if(isDesktop) {
            var msgParam = {};
            msgParam["singlePostMsgArg"] = true;
            this.sendPostMessageToGCMLauncher("getOGSParams", msgParam);
        }else{
            this.ogsParams = this.getOGSParams(this.gameUrl, isDesktop);
            this.resumeInit();
        }
    };

    resumeInit(){
        if(this.game["getConfig"] && this.game.getConfig) {
            if(this.ogsParams == null || this.ogsParams == undefined){
                this._logger.integration.info("GAME.getConfig()");
                this.gameConfig = this.game.getConfig();
                this._logger.integration.info("gameConfig:\n\t", this.gameConfig);
            }else{
                this._logger.integration.info("GAME.getConfig()");
                this.gameConfig = this.game.getConfig(this.ogsParams);
                this._logger.integration.info("gameConfig:\n\t", this.gameConfig);
            }
        }

        // don't need if Desktop? (only for Mobile extract params in launcher)
        this.gameConfig["gameUrl"] = this.gameUrl;

        if(this.device == "mobile"){
            addEventListener('resize', this.gameResized.bind(this), false);
            this.loadLauncher(this.launcherOrigin, this.gameConfig);
        } else {
            this.loadCommonUI();
        }
    }

    /**
     * This function is called from either GCM launcher.getOGSParams() for Mobile or from gcmCore.init() for Desktop.
     * @private
     * @param {Object} These are the standard list of parameters that OGS passes to game providers.
     * Note that this value is overwritten by gcmCore.configure() which is executed at a later time
     * with addition params such as RealityCheck values
     */
    setOGSParams(params){
        this.ogsParams = params;
        this.resumeInit();
    }

    /**
    * This is the function we expose to gcm-launcher so that it can send configuration information to gcm.
    * @private
    * @param {string} commonUIHostname gcm-launcher needs to tell gcm commonUI's hostname so that gcm can listen to post-messages from commonUI
    * @param {Object} ogsParams These are the standard list of parameters that OGS passes to game providers.
    * @param {Object} jqConfiguration Configuration for jackpot query service
    * @param {Object} ogsClientConfiguration Configuration for Ogs Client service
    * @param {Object} lsConfiguration Configuration for LiveServ service
    * These ogsParams will now be sent to game providers via gcm.
    */
    configure(commonUIHostName, ogsParams, gcmConfiguration, gsConfiguration, jqConfiguration, ogsClientConfiguration, lsConfiguration) {

        let operatorPostMessageLibraryUrl = ogsParams["operatorPostMessageLibraryUrl"];

        if(operatorPostMessageLibraryUrl != undefined) {

            let p = this.addServiceScript(operatorPostMessageLibraryUrl);
            p.then((val) => this._logger.debug.info("Operator post msg library script loaded"), (err) => { throw new Error("Failed to load Operator post msg library: ", err) });
        }

        this.commonUIHostName = commonUIHostName;
        //overwrite earlier setOGSParams() with more ogsParams (i.e. RealityCheck info)
        this.ogsParams = ogsParams;
        this.gcmConfiguration = gcmConfiguration;
        this.gsConfiguration = gsConfiguration;
        this.jqConfiguration = jqConfiguration;
        this.ogsClientConfiguration = ogsClientConfiguration;
        this.lsConfiguration = lsConfiguration;

        var gameOption = this.getGCMConfiguration('gameoption');

        if(gameOption && gameOption['MUTE']) {
            this.gameInfo.setDefaultOption('MUTE', gameOption['MUTE']);
        }

        if(this.ogsParams["device"] == "mobile"){
            this.launcherReady();
        }

        //If cmaScriptUrl is present, then load the script file into gcm window.
        if(this.ogsParams["cmaScriptUrl"]){
            let p = this.addServiceScript(this.ogsParams["cmaScriptUrl"]);
            p.then((val) => this._logger.debug.info("cma bridge script loaded"), (err) => { throw new Error("Failed to cma load bridge script: ", err) });
        }
    }

    /**
    * gcm-launcher is responsible for loading commonUI in commonUIIFrame.
    * So gcmCore sends a post message to gcm-launcher as soon as GCM is initialized by Game.
    * @private
    */
    loadCommonUI() {
        this.sendPostMessageToGCMLauncher("loadCommonUI", this.gameConfig);
    };

    // SWEDISH REGULATION PANEL METHODS
    swedishRegulationParametersExist(){
        var swedishParameters = ['selfexclusion_url', 'selfassessment_url', 'depositlimit_url'];

        return swedishParameters.every((param)=>{
            return (this.ogsParams[param]);
        });
    };

    loadExternalSwedishPanel(launcherOrigin){

        let externalPanelDiv = document.createElement('div');
        externalPanelDiv.setAttribute('id', 'externalPanelContent');
        externalPanelDiv.style.left = "0";
        externalPanelDiv.style.top = "50%";
        externalPanelDiv.style.transform = "translateY(-50%)";
        externalPanelDiv.style.position = "fixed";
		//z-index set to avoid interfering with games
		externalPanelDiv.style.zIndex = 10001;
        document.body.appendChild(externalPanelDiv);

        let header = document.createElement('div');
        header.style.height = '20px';
        header.style.backgroundColor = "transparent";
        header.style.position = "absolute";
        header.style.top = '0';
        header.style.width = '100%';
        externalPanelDiv.appendChild(header);


        let panelURL = launcherOrigin+"/gcm/gcm-externalPanel/externalPanel.html";
        let panelFrame = document.createElement('iframe');
        panelFrame.setAttribute("src", panelURL);
        panelFrame.setAttribute('id', 'externalPanelIframe');
        panelFrame.setAttribute('name', 'SwedishPanel');

        panelFrame.style.border = 'none';
        panelFrame.style.width = "70px";
        panelFrame.style.height = '100px';
        panelFrame.style.overflow = "hidden";
        panelFrame.style.borderRadius= "8px 8px 0px 0px";
        panelFrame.style.border = "none";
        //fix to move responsible gaming panel in mobile for some games.
        panelFrame.style.WebkitTransform="none";
        panelFrame.style.transform="none";

        var swedishButtons = ['selfassessment_url', 'selfexclusion_url', 'depositlimit_url'].map((param) =>{
            return {
                id : param.replace('_url', ''),
                url: this.ogsParams[param]
            }
        });

        panelFrame.onload = function(){
            panelFrame.contentWindow.postMessage({action: 'init', type: 'swedishRegulationPanel', params:{swedishButtons: swedishButtons, isDraggable: true}}, launcherOrigin);
        };

        externalPanelDiv.appendChild(panelFrame);

        this.makeDraggable(externalPanelDiv, header);
    };


    makeDraggable(dragElement, dragPoint){
        let firstTouch = true;

        if(!dragPoint)
            dragPoint = dragElement;

        dragPoint.addEventListener('touchstart', (e) => {
            let x = parseInt(e.touches[0].pageX);
            let y = parseInt(e.touches[0].pageY);
            let offsetX = x - parseInt(dragElement.style.left);
            let offsetY = y - parseInt(dragElement.style.top);
            if(firstTouch){
                dragElement.style.transform = "translateY(0)";
                dragElement.style.top = y + "px";
                firstTouch = false;
            }

            dragPoint.addEventListener('touchmove', (e) => {
                e.preventDefault();
                let x = parseInt(e.touches[0].pageX);
                let y = parseInt(e.touches[0].pageY);

                if((x - offsetX) > 0 && (x - offsetX + dragElement.offsetWidth ) < window.innerWidth)
                    dragElement.style.left = (x - offsetX) + "px";

                if((y - offsetY) > 30 && (y - offsetY + dragElement.offsetHeight) < window.innerHeight)
                    dragElement.style.top = (y - offsetY) + "px";
            });

            dragPoint.addEventListener('touchend', (e) => {
                dragPoint.unbind('touchmove');
                dragPoint.unbind('touchend');
            });
        });
    };

    checkExternalPanelPosition(e){
        if(document.getElementById('externalPanelContent')){
            var externalPanel = document.getElementById('externalPanelContent');
            var panelLeftPos = parseInt(externalPanel.style.left) ;
            var panelTopPos = parseInt(externalPanel.style.top) ;

            if(panelTopPos > (window.innerHeight - externalPanel.offsetHeight)){
                externalPanel.style.top = (window.innerHeight - externalPanel.offsetHeight) + "px";
            }

            if(panelLeftPos > (window.innerWidth - externalPanel.offsetWidth)){
                externalPanel.style.left = (window.innerWidth - externalPanel.offsetWidth) + "px";
            }
        }
    }
    // END SWEDISH REGULATION PANEL METHODS

    loadLauncher(launcherOrigin, gameConfig){

        var launchUrl = launcherOrigin+"/gcm/gcm-launcher/launcher.html";
        var ifrm_ = document.createElement('iframe');

        this._logger.debug.info("ifrm_ "+ifrm_);
        ifrm_.onload = function () {
          var messageObject = {};
          messageObject["action"] = "launcherLoaded";
          messageObject["params"] = gameConfig;
          var message = JSON.stringify(messageObject);
          ifrm_.contentWindow.postMessage(message, launcherOrigin);
        }

        ifrm_.name = 'launcherFrame';
        ifrm_.id = "launcherIFrame";
        ifrm_.style.borderStyle = "none";
        ifrm_.style.background = "transparent";
        ifrm_.setAttribute("background-color", 'transparent');
        ifrm_.setAttribute('allowtransparency', 'true');
        ifrm_.setAttribute('allow', 'geolocation');
        ifrm_.style.top = 0;
        ifrm_.style.left = 0;
        ifrm_.style.width = "100%";
        ifrm_.style.height = "100%";
        ifrm_.style.position = "fixed";
        ifrm_.style.zIndex = 999;
        ifrm_.setAttribute('src', launchUrl);
        document.body.appendChild(ifrm_);
    }

    /**
    * Helper method to update reference to launcher window.
    * This method is only called for mobile games where launcher window is loaded in an iframe inside game window.
    * @private
    */
    launcherReady(){
        var ifrm_ = document.getElementById("launcherIFrame");
        this.launcherWindow = ifrm_.contentWindow;
    }

    /**
    * This is a post message listener method.
    * It listens to post messages from CUI and converts them to appropriate javascript call on GCM
    * All post messages from CUI will have two parts:
    * 1. action: the gcm method name that needs to be invoked.
    * 2. params: the list of arguments that needs to be passed to the above method.
    * @private
    * @param event the event Object
    */
    postMessageEventListener(event) {
        if (this.isknownOrigin(event.origin)) {
            var message = JSON.parse(event.data);
            var gcmMethod = message["action"];
            var gcmMethodParams = null;
            if(Validate.isValidGCMMethod(gcmMethod)) {
                if (message["params"]) {
                    gcmMethodParams = Object.keys(message["params"]).map(e => message["params"][e]);
                }
                this._logger.debug.info("Received post message: action: " + gcmMethod + ", params: " + gcmMethodParams);
                // Initialize CUIAdapter Objects as part of first call (init) from CUI.
                if ("commonUIReady" == gcmMethod) {
                    this.commonUI = new CUIAdapter(this, event.source, event.origin);
                }
                // Make call on GCM with received method name and method params
                this[gcmMethod].apply(this, gcmMethodParams);
            } else {
                this._logger.debug.warn("No permission to execute method " + gcmMethod);
            }
        }
    };

    /**
    * This is a helper method to validate post-message origin.
    * GCM will only accept post-messages from hostname where gcm-launcher is hosted
    * or from hostname where commonUI is hosted.
    * @private
    * @param {string} the event origin string
    */
    isknownOrigin(origin) {
        return origin.indexOf(this.launcherHostName) != -1 || origin.indexOf(this.commonUIHostName) != -1;
    };

    /**
    * The commonUI should call this method once it has finished loading.<br>
    * The commonUI must call registerService with CCY_FORMAT before making commonUIReady call on GCM.<br>
    * GCM uses a commonUI adapter object to communicate with commonUI via post-messages
    * @public
    */
    commonUIReady() {
        this._logger.integration.info("GCM.commonUIReady()");

        // Inform commonUI about game's loading screen preference as soon as commonUIReady is received
        if(this.gameConfig && this.gameConfig['gameLoadingScreen']) {
            this.commonUI.gameHasLoadingScreen();
        }

        var loggedIn = Validate.isDefinedAndNotNull(this.ogsParams["sessionid"]);
        this.commonUI.configReady(loggedIn);

        // Provide commonUI reference to various GCM modules
        this.notificationHandler_.init(this.commonUI);
        this.gameInfo.setCommonUI(this.commonUI);
        this.gameStateController_.init(this.commonUI);

        // Tell gcm-launcher that commonUI is ready so that it can reveal commonUI window
        this.sendPostMessageToGCMLauncher("commonUIReady", null);

        // If game is already ready, then inform commonUI
        if(this.isGameReady) {
            this.commonUI.gameReady();
        }
    };

    /**
    * This API can be called by common UI to modify the height and width of common UI iframe.
    * GCM then delegates it to gcm-launcher which owns the page to resize commonUIIFrame.
    * @public
    * @param {string} height new height of iframe in any css unit, e.g. '20%',
    *          '20px', '20em' are all valid.
    * @param {string} width (Optional) The new width of iframe, same format as height.
    * @param {string} offsetX Gap between top/bottom and start of the iframe.
    * @param {string} offsetY Gap between sides and start of the iframe.
    * @param {boolean} reAdjust Defaults to true. Only used for desktop games
               where we need to re-adjust gameIframe based on commonUI size.
    */
    commonUIResize(height, width, offsetX, offsetY, reAdjust) {
        this._logger.integration.info("GCM.commonUIResize(\n\theight:", height, "\n\twidth:", width, "\n\toffsetX:", offsetX, "\n\toffsetY:", offsetY, "\n\treAdjust:", reAdjust,"\n)");

        if(this.device == "desktop"){
            this.sendPostMessageToGCMLauncher("commonUIResize", arguments);
        } else {
            this.commonUIResizeMobile(height, width, offsetX, offsetY);
        }
    };

    /**
    * This method is called by launcher.js when the root window is resized.
    * game is resized directly.
    * common-ui has gameResized which performs ratio calculations in commonui.js,
    * which in turn calls commonUIResize on gcm, wich in turn calls commonUIResize back on launcher
    * which can safely (in terms of cross domain restrictions) resize the common-ui
    *
    * @private
    * @param {*} width the innerWidth of launcher.html
    * @param {*} height the innerHeight of launcher.html
    */
    launcherResized(width, height) {
        this.commonUI.gameResized(width, height);
    }

    gameResized(event){
        this.commonUI.gameResized(window.innerWidth, window.innerHeight);
        this.checkExternalPanelPosition(event);
    }

    commonUIResizeMobile(height, width, offsetX, offsetY){

        var commonUIIFrame = document.getElementById("launcherIFrame");

        if (offsetX && offsetY) {
          commonUIIFrame.style.height = height;
          commonUIIFrame.style.width = width;
          commonUIIFrame.style.left = offsetX;
          commonUIIFrame.style.top = offsetY;
          commonUIIFrame.style.marginLeft = 0;
        } else {
          if (height) {
            commonUIIFrame.style.height = height;
          }
          if (width) {
            commonUIIFrame.style.width = width;
            var currentWidth = commonUIIFrame.offsetWidth;
            commonUIIFrame.style.left = '50%';
            commonUIIFrame.style.marginLeft = (-currentWidth / 2) + 'px';
          }
        }
    }

    /**
    * This method is a called when GCM finishes loading currencyFormat object into the window.
    * The url to currencyFormat javascript file is provided by commonUI when it calls registerService on GCM.
    * @private
    * @param {Object} script object that is loaded
    */
    configReady() {
        this.setupAnalytics(this.ogsParams["gameName"]);

        this.promotions.setCcyFormatter(this.ccyFormatter);
        this.promotions.setEnabled(this.ogsParams['mode'] === this.gameInfo.PlayMode.REAL);

        this._logger.integration.info("GAME.gcmReady(\n\tgcm:", this, "\n)");
        this.game.gcmReady(this);
        // is undefined for mobile (have not entered launcher yet)
        this.ogsParams["playMode"] = this.ogsParams["mode"];
        this._logger.integration.info("GAME.configReady(\n\togsParams:", this.ogsParams, "\n)");
        this.game.configReady(this.ogsParams);
    };

    /**
     * Game clients should invoke this method if they need to be notified
     * for any changes in the balances of any OGS jackpot(s)
     * @param {string} currency the player currency
     * @param {Object} jackpots the game's currently active jackpot pool uuids retrieved from the game server
     */
    pollJackpots(currency, jackpots) {

        this.playerCurrency = currency;
        this.latestActiveJackpotIdentifiers = jackpots;

        if (typeof this.game.jackpotBalancesUpdate === "function") {
            (function(self) {
                let querystring = Object.keys(self.latestActiveJackpotIdentifiers).
                map(key => 'instance' + '=' + self.latestActiveJackpotIdentifiers[key]).
                join('&');

                if(self.playerCurrency !== null) {
                    querystring += `&currency=${self.playerCurrency}`;
                }

                const url = `${self.jqConfiguration.jqUrl}?${querystring}`;

                clearInterval(self.timer);

                self.timer = setInterval(function() {
                    return self.jackpotsUpdate(url, self).then(response => {
                        if (response.status == 200) {
                            if (response.data.hasOwnProperty('jackpots')) {
                                self.onJackpotsUpdateSuccess(response.data.jackpots);
                            } else {
                                self._logger.debug.error('unrecognized response from service ' + response.data);
                            }

                        }
                    }).catch(e => {
                        self._logger.debug.warn("Jackpots update has been failed");
                    });
                }, self.jqConfiguration.interval || 1000);
            })(this);
        }
    };

    jackpotsUpdate(url, self) {
        return axios.get(url).then(response => {
            this._logger.debug.info('response: ' + JSON.stringify(response.data));
            return response;
        }).catch(error => self.onJackpotsUpdateFailed(error));
    }

    onJackpotsUpdateSuccess(responseData) {
        this.latestJackpotBalances = responseData;
        if (typeof this.game.jackpotBalancesUpdate === "function" && this.gameStateController_.isGameIdle()) {
            this._logger.integration.info("GAME.jackpotBalancesUpdate(\n\tresponseData:", responseData, "\n)");
            this.game.jackpotBalancesUpdate(responseData);
        }
    }

    onJackpotsUpdateFailed(error) {
        this.latestJackpotBalances = [];
        if (typeof this.game.onJackpotsUpdateFailed === "function") {
            if(error.response.hasOwnProperty('data')) {
                this._logger.integration.info("GAME.onJackpotsUpdateFailed(\n\terrorMessage:", error.response.data, "\n)");
                this.game.onJackpotsUpdateFailed(error.response.data);
            } else {
                this._logger.debug.error('jackpot query api response without error message: ' + error.response.status);
            }
        }
    }

    /**
     * The game should call this method when it wants to present a jackpot dialog managed
     * by commonui
     *
     * @public
     *
     * @param {Object} includes the type of dialog that gcm should show.
     *
     * Example payload:
     * <code>
     *      {
     *          type: "syndicatedWinCalculation"
     *      }
     * </code>
     */
    showJackpotMessageDialog(payload) {
        if (payload && payload.type) {
            switch (payload.type) {
                case "syndicatedWinCalculation":
                    if (!this.syndicateJackpotWinAwardDialogIsOpen) {
                        const notification = new GCMNotification(GCMNotification.TYPE.SYNDICATED_JACKPOT_PROGRESS_BAR, { timeout: 10000 });
                        this.notificationHandler_.handleNotification(notification);
                    }
                    break;
                default:
            }
        }
    }

    /**
     * Common ui should call this method as soon as the user closes the Syndicate Jackpot Win Award Dialog.
     * 
     * @public
     */
    syndicateJackpotWinAwardDialogClosed() {
        this.syndicateJackpotWinAwardDialogIsOpen = false;
    }

    /**
    * The game should call this method when it is loaded and initialized.<br>
    * @public
    *
    */
    gameReady() {
        this._logger.integration.info("GCM.gameReady()");

        this.isGameReady = true;
        this.gameInfo.setGame(this.game);

        if (this.device == "mobile" && this.swedishRegulationParametersExist())
            this.loadExternalSwedishPanel(this.launcherOrigin);

        this.notificationHandler_.setGame(this.game);
        if (this.commonUI) {
          this.commonUI.gameReady();
        }

    };

    /**
    * After the commonUI has shown the game it should call this method to say it has done so.
    * GCM will ask gcm-launcher to re-adjust the page and inform the Game to enable itself.
    * @public
    */
    gameRevealed() {
        this._logger.integration.info("GCM.gameRevealed()");

        if(this.analyticsEnabled) {
            ga('send', 'timing', 'gameRevealed', this.ogsParams["gameName"], Math.round(performance.now()));
        }

        // Tell gcm-launcher that game is revealed so that it can adjust commonUI size appropriately
        this.sendPostMessageToGCMLauncher("gameRevealed", null);
        this.sendPostMessageToOperator({"gcmevent": "gameRevealed"});

        // if game has promotions then initialise promotions and call gameRevealed
        if(this.promotionsEnabled === true) {
            this.promotions.init().then(
                    function () {
                        this._logger.integration.info("GAME.gameRevealed()");
                        this.game.gameRevealed();
                    }.bind(this)
            );
        }
        else {
            this._logger.integration.info("GAME.gameRevealed()");
            this.game.gameRevealed();
        }
    };

    /**
    * The game must call this each time the stake changes, even though not all
    * commonUI implementations will choose to display stake in the commonUI.
    * @public
    * @function
    * @param {number} stake numeric value.
    * @return {Object} the ccy format object of the stake value in the format:
    *        {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£',
    *        ccy_thousand_separator: ',', ccy_decimal_separator: '.'}.
    */
    stakeUpdate(stake) {
        this._logger.integration.info("GCM.stakeUpdate(\n\tstake:", stake, "\n)");

        if (!stake) {
            stake = 0.00;
        }

        if (!Validate.isNumericValue(stake)) {
            throw new Error('gcm.stakeUpdate: Invalid stake value:' + stake);
        }

        this.account.stake_ = stake;

        var formatedValue = this.ccyFormatter['format'](this.account.stake_);

        if(this.commonUI) {
            this.commonUI.stakeUpdate(formatedValue);
        }

        return formatedValue;
    };

    /**
    * The game must call this each time paid changes, even though not all commonUI
    * implementations will choose to display paid in the commonUI.
    * @public
    * @param {number} paid numeric value.
    * @return {Object} the ccy format object of the paid value in the format:
    *        {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£',
    *        ccy_thousand_separator: ',', ccy_decimal_separator: '.'}.
    */
    paidUpdate(paid) {
        this._logger.integration.info("GCM.paidUpdate(\n\tpaid:", paid, "\n)");

        if (!paid) {
            paid = 0.00;
        }

        if (!Validate.isNumericValue(paid)) {
            throw new Error('gcm.paidUpdate: Invalid paid value:' + paid);
        }

        this.account.paid_ = paid;
        var formatedValue = this.ccyFormatter['format'](this.account.paid_);

        if(this.commonUI) {
            this.commonUI.paidUpdate(formatedValue);
        }

        return formatedValue;
    };

    /**
    * The game should call this function with a balanceFudge parameter when it
    * wants to hide the winnings, then when the winnings have been revealed
    * in the game, game should call it again without the balanceFudge parameter
    * to display the actual balance.
    * The commonUI is also able to call this function in order to update the balance
    * after a quick deposit.  The commonUI should use the calledFromCommonUI parameter
    * to show that this has happened, and so that GCM will call through to the game with
    * the update balance information.
    * @public
    * @param {Object} balances A map of balances with following format:  <br>
    * <code>
    *            {
    *                'CASH': {amount: 1000.00},
    *                'BONUS': {amount: 20.00}
    *            }
    * </code>
    *
    * @param {number=} balanceFudge (Optional) the numeric amount to decrement the displayed
    *          balance by until the game play is complete. This will usually be the
    *          game winnings, which have not yet been shown to the player in the
    *          game animation.<br>
    *          If this parameter is not provided, gcm will display the actual balance.
    * @param {boolean=} changedFromCommonUI (Optional) this should be set to true when this function is called
    *          by the commonUI.
    * @return {Object} formattedBalances a balances object containing ccy format objects
    *        for each balance type:
    *            {
    *                'CASH': {display: '£10.00', code:'GBP', value: 10.00, currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'},
    *                'BONUS': {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'}
    *            }
    */
    balancesUpdate(balances, balanceFudge, changedFromCommonUI) {
        this._logger.integration.info("GCM.balancesUpdate(\n\tbalances:", balances, "\n\tbalanceFudge:", balanceFudge, "\n\tchangedFromCommonUI:", changedFromCommonUI,"\n)");

        // Initialize 3rd party services.
        if (!this.isAccountInit) {
          this.isAccountInit = true;
          this.initExternalServices();
        }

        // Promotions impact the balance of the user in a non standard way. For instance, the winnings from freerounds
        // are only credited to the wallet upon playing the final freeround. In order to prevent game providers from
        // needing to have an understanding of the impact of promotions on the balance, we have added logic here to
        // determine if the promotions module should override the balanceFudge from the game
        if (this.promotions.isEnabled() && changedFromCommonUI !== true) {
            const promoBalanceFudge = this.promotions.getPromoBalanceFudge()

            if (promoBalanceFudge !== null) {
                balanceFudge = promoBalanceFudge
            }
        }

        const cashType = 'CASH'; //Account.BalanceTypes.CASH;

        if (!balanceFudge) {
            balanceFudge = 0;
        }

        //copy balances
        //don't clear the balances - we want to maintain any balance types
        //which are not included in the balances parameter, so that the commonUI
        //is able to just update the cash amount
        this.account.balances_ = {};
        for (var type in balances) {
          this.account.balances_[type] = {};
          this.account.balances_[type]['amount'] = balances[type]['amount'];
        }

        //copy to fudgedBalances (note that we copy the balances_ not the balances, so
        //that we are including any persisted freebet balance etc.)
        var fudgedBalances = {};
        for (var type in this.account.balances_) {
          fudgedBalances[type] = {};
          fudgedBalances[type]['amount'] = this.account.balances_[type]['amount'];
        }

        //deduct balanceFudge from CASH balance
        if (fudgedBalances[cashType]) {
          fudgedBalances[cashType]['amount'] = + this.account.balances_[cashType]['amount'] - balanceFudge;
        }

        var formattedBalances = {};
        //format each balance
        for (var type in fudgedBalances) {
          formattedBalances[type] = {};
          formattedBalances[type] = this.ccyFormatter['format'](fudgedBalances[type]['amount']);
        }

        if(this.commonUI) {
          this.commonUI.balancesUpdate(formattedBalances);
        }

        // Check if this method is called by CUI.
        if (typeof changedFromCommonUI !== undefined && changedFromCommonUI === true && this.game) {
            //make a copy of balances to pass onto game
            var balancesCopy = {};
            for (type in this.account.balances_) {
                balancesCopy[type] = {};
                balancesCopy[type]['amount'] = this.account.balances_[type]['amount'];
            }
            this._logger.integration.info("GAME.balancesHasChanged(\n\tbalances:", balancesCopy, "\n)");
            this.game.balancesHasChanged(balancesCopy);
        }

        return formattedBalances;
    };

    /**
     * Initializes any external service (eg. GameSparks, etc)
     * @private
     */
    initExternalServices() {

     // Init GameSparks
      this.initializeGamesparks();
      // Init OgsClient
      this.initializeOgsClient();

      // Init LiveServ
      this.initializeLiveServ();
      
    }
    /**
     * Initialize the Gamesparks if the Gamesparks configuration exist
    */
    initializeGamesparks(){
       if(this.ogsParams['mode'] === this.gameInfo.PlayMode.REAL){
          if (typeof this.gsConfiguration !== 'undefined' &&
            this.gsConfiguration != null &&
            this.gsConfiguration.enabled) {
             //Create the Widget UI Adaptor and get a reference to the notification handler of the adaptor so GameSparksEvents can send Challenge messages to the Widget directly
             this.widgetUIAdaptor = new WidgetUIAdaptor(this.gameSparksHandler_);
             //Made the widget notification handlers an object of different handlers for future use
             let widgetNotificationHandlers = {
                 challengeNotificationHandler : this.widgetUIAdaptor.handleFeatureNotification
             }
            // Initialize GameSparks
            this.gameSparksHandler_.init(this, this.ogsParams, this.notificationHandler_, widgetNotificationHandlers, this.gsConfiguration);
          }
       }
    }

    /**
     * Initialize the OGS Client if the OGS Client configuration exist
     */
    initializeOgsClient() {
        if (typeof this.ogsClientConfiguration !== 'undefined' && 
        this.ogsClientConfiguration != null && 
        this.ogsClientConfiguration.enabled) {
            this.ogsClient.init(this.ogsClientConfiguration, this.ogsParams);
        }
    }

    /**
     * Initialize the LiveServ if the LiveServ configuration exist
     */
    initializeLiveServ() {   
        if (this.isLiveServEnabled()) {
            if(typeof this.game.getOgsClientToken !== "function") {
                return;
            }

            let ogsClientToken = this.game.getOgsClientToken();
            if (typeof ogsClientToken !== 'undefined' && ogsClientToken != null) {
                this.ogsClient.getLiveServToken(ogsClientToken).then(authInfo => {
                    this.liveServHandler.init(this, this.notificationHandler_, this.lsConfiguration, authInfo);
                })
                .catch(error => console.log(error));
            }
        }
    }

    /**
     * This function checks the liveserv configuration value, and return boolean
     */
    isLiveServEnabled(){
      return typeof this.lsConfiguration !== 'undefined' &&
        this.lsConfiguration != null &&
        typeof this.lsConfiguration !== 'undefined' &&
        typeof this.lsConfiguration.enabled !== 'undefined' &&
        this.lsConfiguration.enabled;
    }

    /**
    * The game should call gameAnimationStart when it starts it's game play
    * animation After this the commonUI is not permitted to display any content
    * until gameAnimationComplete() is invoked by the game.
    * @public
    */
    gameAnimationStart() {
        this._logger.integration.info("GCM.gameAnimationStart()");
        this.gameStateController_.gameAnimationStart();
        this.sendPostMessageToOperator({"gcmevent": "gameAnimationStart"});
    };

    /**
    * The game should call gameAnimationComplete(resumeCallback) when the game
    * animation is complete. This will have the effect of handing over control to
    * GCM so that any pending notifications can be shown in the commonUI. Once GCM
    * has completed showing any notifications in the commonUI, the resumeCallback
    * will be called.
    * @public
    * @param {Function} resumeCallback the callback function that should be
    *          called when the commonUI has completed dealing with notifications.
    */
    gameAnimationComplete(resumeCallback) {
        this._logger.integration.info("GCM.gameAnimationComplete(\n\tresumeCallback:", resumeCallback, "\n)");

        this.promotions.gameAnimationComplete();
        this.gameStateController_.gameAnimationComplete(resumeCallback);
        if (typeof this.game.jackpotBalancesUpdate === "function" && this.latestJackpotBalances.length > 0) {
            this._logger.integration.info("GAME.jackpotBalancesUpdate(\n\tbalances:", this.latestJackpotBalances, "\n)");
            this.game.jackpotBalancesUpdate(this.latestJackpotBalances);
        }
        this.sendPostMessageToOperator({"gcmevent": "GameAnimationComplete"});
    };

    /**
    * The Common-ui should call isGameIdle() to check what state the game is in.
    * A post msg is sent back to the common-ui gameIdle(bool).
    */
    isGameIdle() {
        let idle = this.gameStateController_.isGameIdle();
        this.commonUI.gameIdle(idle);
    }

    /**
    * The game should call handleError on gcm for any error to be displayed and handled
    * by the CommonUI. <br>
    * GCM will call commonUI.handleError() to pass this error to commonUI for handling.
    * The commonUI is responsible for both the display and the logic for what happens
    * after an error is displayed to the user.<br>
    * @public
    * @param {string} errorCategory the category of current error.
    *                 The current error categories are:
    *                 {
    *                     CRITICAL,
    *                     INSUFFICIENT_FUNDS,
    *                     LOGIN_ERROR,
    *                     RECOVERABLE_ERROR,
    *                     NON_RECOVERABLE_ERROR,
    *                     CONNECTION_ERROR,
    *                     MULTI_CHOICE_DIALOG,
    *                     OTHER_GAME_IN_PROGRESS,
    *                     REALITY_CHECK
    *                 }.
    * @param {string} errorSeverity this signifies the severity of the error and can
    *          be 'WARNING', 'INFO' or 'ERROR'.
    * @param {string} errorCode the error code string. Note that usually nothing
    *          should be done with this parameter. The commonUI is not expected to
    *          do any business logic based on the error code, but it is passed
    *          through in case the commonUI wishes to log the error codes that
    *          have been sent.
    * @param {string} errorMessage the error message provide by game.
    * @param {Object=} errorParams (Optional) the optional JSON object parameter to allow the game to pass additional
    *          information to the commonUI on how to handle the error. Name key, value pairs
    *          must be provided in a valid JSON format.
    *          This parameter is used for (and not restricted to) error categories
    *          "OTHER_GAME_IN_PROGRESS" and "MULTI_CHOICE_DIALOG".
    *
    *          Usage in "OTHER_GAME_IN_PROGRESS"
    *          Raising a "OTHER_GAME_IN_PROGRESS" error category will inform the CommonUI that more than
    *          one game is already in progress.
    *          The CommonUI can relaunch the corresponding game by using game information provided in errorParams argument.
    *          When calling an error of this category type the game name must be provided as part of the error parameters
    *          in JSON format in a 'gameName' tag. Any additional game launching information can be provided within
    *          a 'gameInProgressParams' tag in the JSON object.
    *
    *          Example of errorParams object for a "OTHER_GAME_IN_PROGRESS" error:
    *              {'gameName': 'ChainReactors'}
    *              {'gameInProgressParams': {
    *                         'channel': 'I',
    *                         'lang': 'en',
    *                         'playMode': 'real',
    *                         'loginToken': 'tqQRojxew8fBeadMe/8gtOk8nz1+PeuCSE0AQdKyw0Og4wpnFyZhrVh2VhZhp67gz10s8Y2==',
    *                         'affId': '1'
    *                         }
    *              }}
    *
    *
    *          Usage in "MULTI_CHOICE_DIALOG"
    *          Raising a "MULTI_CHOICE_DIALOG" error category will inform the CommonUI that the error dialog can be
    *          displayed with multiple options.  These options will be provided in errorParams object.
    *          When the user acknowledges the error dialog, the selected option's index will be returned to the game.
    *
    *          Example of errorParams object for a "OTHER_GAME_IN_PROGRESS" error:
    *              {'options' : ['Ok', 'Cancel', 'Quit']}
    *
    *
    *          Usage in providing additional error handling information
    *          This is an example of how this parameter can be used when the error category raised
    *          is not a "OTHER_GAME_IN_PROGRESS" or "MULTI_CHOICE_DIALOG" type.
    *          This example provides a method to suppress an error message if for example the previous
    *          error was a "MULTI_CHOICE_DIALOG" error category type and the player selected an option to "close the game".
    *          This could result in the game raising a Critical error to inform the CommonUI that it is closing the game.
    *          This error can be suppressed since the player has chosen to close the game.
    *
    *          This example scenario would require additional information to be provided in the following format:
    *              {'suppressMessage':'true'}
    *
    */
    handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams) {
        this._logger.integration.info("GCM.handleError(\n\terrorCategory:", errorCategory, "\n\terrorSeverity:", errorSeverity, "\n\terrorCode:", errorCode, "\n\terrorMessage:", errorMessage, "\n\terrorParams:", errorParams,"\n)");

        this.notificationHandler_.addEventListener(GCMEvent.COMPLETE, this.onHandleErrorComplete, this);
        this.errorHandler_.handleError(errorCategory, errorSeverity, errorCode, errorMessage, errorParams);
    };

    /**
    * The game should call handleServerError with every error that it receives from
    * the game server. This is only applicable for OpenBet managed games service games.
    * GCM will categorize the error based on the error code in the errorInfo object.
    * <code>
    * The current error categories include:
    *                 {
    *                     CRITICAL,
    *                     INSUFFICIENT_FUNDS,
    *                     LOGIN_ERROR,
    *                     RECOVERABLE_ERROR,
    *                     NON_RECOVERABLE_ERROR,
    *                     CONNECTION_ERROR,
    *                     MULTI_CHOICE_DIALOG,
    *                     OTHER_GAME_IN_PROGRESS
    *                 }.
    * Default error category is NON_RECOVERABLE_ERROR.
    * </code>
    * GCM will also supply the error severity for known errors. i.e. 'WARNING', 'INFO'
    * or 'ERROR'.  This can be used by the commonUI to display different colours and titles for the
    * error dialogs if desired.<br>
    * GCM will pass the error onto the commonUI to both display the error and decide
    * what it would like to do after the error has been shown (business logic should be
    * based on the errorCategory supplied by GCM)<br>
    *
    * Note that the errorInfo object parameter required for this function can
    * be created using com.openbet.gcm.xmlutil.getErrorInfoFromFOGXml() which takes
    * the XML Error response from the FOG/RGI server and converts it into the
    * required object format.  Alternatively the object can be created directly by the
    * game's FOG response parsing code.
    * @private
    * @param {Object} errorInfo The error object in the following format:
    * <code>
    *          {
    *            errorCode: code,
    *            errorMessage: msg
    *          }</code>.
    * @throws Error if the params are invalid.
    */
    handleServerError(errorInfo) {
        if (this.errorHandler_.isRealityCheckError(errorInfo['errorCode'])) {
            // Before handling a reality check error, reality check details such as realityCheckPeriod, sessionTime etc
            // needs to be retrieved and then handleRealityCheckError is called on gcmCore.
            this.getRealityCheckDetails(this.handleRealityCheckError);
        } else {
            this.errorHandler_.handleServerError(errorInfo);
            //listen to COMPLETE event of notification handler to be sure all pending notifications
            //are handled before game resume.
            this.notificationHandler_.addEventListener(GCMEvent.COMPLETE, this.onHandleErrorComplete, this);
        }
    };

    /**
     * This function will be called by GCM when it receives a reality check error from Game.
     * @param {Function} realityCheckCallback the callback function that should be
     * called when gcm web-service returns the reality check details in a JSON object.
     * @return {Object} the realityCheckDetails object.
     * Example of realityCheckDetails object :
     *
     * { "realityCheckInfo": {"custId": "3", "realityCheckPeriod": "1800", "sessionTime": "3000", "remainingTime":"0"},
     *   "rcParams" : {"param1": "value1", "param2": "value2",...,"paramN":"valueN"}
     * }
     * Note: rcParams Object param in this response is an optional parameter and can contain unrestricted number of params.
     *
     */
    getRealityCheckDetails(realityCheckCallback) {
         //var realityCheckDetails = new RealityCheckDetails (realityCheckCallback ,gcmCore.gcmWebServiceBaseUrl_);
         //send reality check details request
         //realityCheckDetails.init();
    };

    /**
    * handleRealityCheckError function is called for handling reality check error.
    * Existing flash and HTML5 games make use of handleError or handlerServerError for all types of error handling.
    * So this function does not get called directly by Game and through one of the above mentioned functions.
    * Once the error is processed, GCM will call commonUI.handleError() to pass this error to commonUI for handling.
    * The commonUI is responsible for both the display and the logic for what happens
    * after a reality check error is displayed to the user.
    * @public
    * @param {Object} realityCheckDetails JSON object parameter. This object is added to errorParams
    * when calling handleError on commonUI.
    * Example of realityCheckDetails object :
    *
    * { "realityCheckInfo": {"custId": "3", "realityCheckPeriod": "1800", "sessionTime": "3000", "remainingTime":"0"},
    *   "rcParams" : {"param1": "value1", "param2": "value2",...,"paramN":"valueN"}
    * }
    * Note: rcParams Object param in this response is an optional parameter and can contain unrestricted number of params.
    *
    */
    handleRealityCheckError(realityCheckDetails) {
        this._logger.integration.info("GCM.handleRealityCheckError(\n\trealityCheckDetails:", realityCheckDetails, "\n)");

        this.notificationHandler_.addEventListener(GCMEvent.COMPLETE, this.onHandleErrorComplete, this);
        this.errorHandler_.handleRealityCheckError(realityCheckDetails);
    };

    /**
    * Event listener function used when error handling complete.
    * @private
    */
    onHandleErrorComplete() {

        this.notificationHandler_.removeEventListener(GCMEvent.COMPLETE, this.onHandleErrorComplete, this);

        var errorParamIndex = ErrorNotification.getErrorParamIndex();

        if (errorParamIndex != undefined) {
            this._logger.integration.info("GAME.resume(\n\terrorParamIndex:", errorParamIndex, "\n)");
            this.game.resume(errorParamIndex);
            ErrorNotification.setErrorParamIndex(undefined);
        } else {
            this._logger.integration.info("GAME.resume()");
            this.game.resume();
        }
    };

    /**
    * Games can call this function to get a currency formatted string of a decimal amount.
    * @public
    * @param {number} amount Amount to be formatted.
    * @return {string} formatted string representation.
    **/
    formatAmount(amount) {
        this._logger.integration.info("GCM.formatAmount(\n\tamount:", amount, "\n)");

        return this.ccyFormatter['format'](parseFloat(amount)).display;
    };

    /**
    * Either the game or the commonUI can call this method on gcm to state that an
    * option has changed. There could be UI in both the game and the commonUI to
    * control options such as MUTE and TURBO, also the display option such as
    * show about box or game preferences. and the new value should be reflected
    * in both places
    * @public
    * @param {string} optionType one of MUTE, TURBO, ABOUT, HELP, PAYTABLE and GAME_PREFERENCE.
    * @param {string} changedFrom one of COMMONUI, GAME. This tells gcm whether the
    *          option was switched in the game or the commonUI.
    * @param {boolean} newValue the new value of the option.
    */
    optionHasChanged(optionType, changedFrom, newValue) {
        this._logger.integration.info("GCM.optionHasChanged(\n\toptionType:", optionType, "\n\tchangedFrom:", changedFrom, "\n\tnewValue:", newValue, "\n)");

        this.gameInfo.optionHasChanged(optionType, changedFrom, newValue);
    };

    /**
    * This is an optional call for the game to make to GCM. The game can choose to
    * use this facility if they choose to allow the commonUI to control game
    * options.<br>
    * Options can be registered are including game setting options such as 'MUTE'
    * 'TURBO' and game display options such as 'PAYTABLE', 'ABOUT', 'HELP' and 'GAME_PREFERENCE'
    * @public
    * @param {string} optionType one of MUTE, TURBO, ABOUT, HELP, PAYTABLE and GAME_PREFERENCE.
    * @return {boolean|string} the initial value of the option is returned back to the
    *         game. GCM can potentially in the future save these options in cookies
    *         or against the account, so that we have persistence of options.
    * @throws Error if the optionType params are invalid
    */
    regOption(optionType) {
        this._logger.integration.info("GCM.regOption(\n\toptionType:", optionType, "\n)");

        return this.gameInfo.regOption(optionType);
    };

    /**
    * The game must call this on gcm so that the commonUI can be updated with
    * loading progress and display progress in a loading screen
    * @public
    * @param {number} percentLoaded the percentage of the loading process complete.
    */
    loadProgressUpdate(percentLoaded) {
        this._logger.integration.info("GCM.loadProgressUpdate(\n\tpercentLoaded:", percentLoaded, "\n)");

        this.gameInfo.loadProgressUpdate(percentLoaded);
    };

    /**
    * This function is called by commonUI when it's done handling recoverable error.
    * gcm will call game.resume() to resume the game play.
    * @public
    * @param {*=} feedback (Optional) The feedback from user for the resumption
    *            of current outstanding notification. The feedback detail depend
    *            on notification type. Notifications expect feedback including:<br>
    *              - SESSION_TIMER <br>
    */
    resume(feedback) {
        this._logger.integration.info("GCM.resume(\n\tfeedback:", feedback, "\n)");

        if(this.gameStateController_.gameResumeCallback_) {
            // If game has registered a callback method, then we need to make sure this
            // callback method is called after all pending notifications are processed
            this.notificationHandler_.addEventListener(GCMEvent.COMPLETE, this.onNotificationHandlingComplete, this);
        }
        this.notificationHandler_.resume(feedback);
    };

    onNotificationHandlingComplete() {
        this.notificationHandler_.removeEventListener(GCMEvent.COMPLETE, this.onNotificationHandlingComplete, this);
        if(this.gameStateController_.gameResumeCallback_) {
            this.gameStateController_.gameResumeCallback_();
            this.gameStateController_.gameResumeCallback_ = null;
        }
    }

    /**
    * This method is a called by CommonUI when it wants to reload the page as part of error handling.
    * If desktop GCM then sends a post-message to gcm-launcher(which is the main page) to reload itself.
    * If mobile, GCM will attempt to invoke same function on the game.
    * @public
    */
    reload() {
        this._logger.integration.info("GCM.reload()");
        this.sendPostMessageToOperator({"gcmevent": "reload","url": ""});
        
        if(this.ogsParams["device"] == 'desktop') {
            this.sendPostMessageToGCMLauncher("reload", null);
        }else{
            if(this.game["reload"]) {
                this._logger.integration.info("GAME.reload()");
                this.game.reload();
            }
        }
    };

    /**
    * This method is a called by CommonUI when it wants to redirect the main window to a different page as a result of
    * error handling action(like login_error).
    * If desktop GCM then sends a post-message to gcm-launcher(which is the main page) to redirect to the requested page.
    * If mobile, GCM will attempt to invoke same function on the game.
    * @public
    * @param {String} redirectUrl The url to redirect current page
    */
    redirect(redirectUrl) {
        this._logger.integration.info("GCM.redirect(\n\tredirectUrl:", redirectUrl, "\n)");

        this.sendPostMessageToOperator({"gcmevent": "redirect","url": redirectUrl});
        if(this.ogsParams["device"] == 'desktop') {
            this.sendPostMessageToGCMLauncher("redirect", arguments);
        }else{
            if(this.game["redirect"]) {
                this._logger.integration.info("GAME.redirect(\n\tredirectUrl:", redirectUrl, "\n)");
                this.game.redirect(redirectUrl);
            }
        }
    };

    /**
    * This method is a called by CommonUI when user clicked join or cancel
    * @param {String} user action will be either "JOIN" or "REJECT"
    */
    gsPlayerAction(action) {
        this.gameSparksHandler_.onMissionPlayerAction(action)
    }

    /**
    * Register a custom service with GCM like CCYFormat
    * This function allows the customer to register GCM with their custom service like CurrencyFormat,
    * through their commonUI before invoking gcm.init
    * CommonUI must call registerService before commonUIReady
    * @public
    * @param {String} serviceType, service type to register eg: CCY_FORMAT
    * @param {Object} serviceUrl, url where script object for serviceType is availabe.
    */
    registerService(serviceType, serviceUrl, initParams) {
        this._logger.integration.info("GCM.registerService(\n\tserviceType:", serviceType, "\n\tserviceUrl:", serviceUrl, "\n\tinitParams:", initParams,"\n)");

        switch (serviceType) {
            case 'CCY_FORMAT':
                let p = this.addServiceScript(serviceUrl);
                p.then((val) => this.ccyConfigLoaded(val, initParams), (err) => { throw new Error("Failed to load serviceScript: ", err) });
                break;
        }
    };

    /**
    * Callback method for CCY_FORMAT registerService call.
    * this.configReady() should be called when all / last config has been loaded.
    * Currently only registering CCY_FORMAT service, so it resides here.
    * @private
    * @param {string} script loaded
    */
    ccyConfigLoaded(script, initParams) {
        this.ccyFormatter = currencyFormat;
        this.ccyFormatter["init"].apply(this, initParams);
        this.configReady();
    }

    /**
    * Helper method to load a supplied javascript url on the current window
    * @private
    * @param {string} scriptUrl
    */
    addServiceScript(scriptUrl) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptUrl;
            script.addEventListener('load', () => resolve(script), false);
            script.addEventListener('error', () => reject(script), false);
            document.body.appendChild(script);
        });
    };

    getGCMConfiguration(serviceName) {
        if(this.gcmConfiguration[serviceName] && this.gcmConfiguration[serviceName]['Enabled']) {
            return this.gcmConfiguration[serviceName]['Parameters'];
        }
        return null;
    }

    setupAnalytics(gameName) {
        var analyticsConfiguration = this.getGCMConfiguration('analytics');
        if (analyticsConfiguration && analyticsConfiguration['trackingid']) {
          var analyticsId = analyticsConfiguration['trackingid'];
          var sampleRate = analyticsConfiguration['samplerate'];
          // See https://developers.google.com/analytics/devguides/collection/analyticsjs/
          (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
              (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
          })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

          ga('create', analyticsId, 'auto', { 'siteSpeedSampleRate': sampleRate });
          ga('send', 'pageview');

          if (window.performance) {
            ga('send', 'timing', 'gcmReady', gameName, Math.round(performance.now()));
            this.analyticsEnabled = true;
          }
        }
    }

    /**
     * Game should call this method to handle any and all generic messages received through message trigger.
     *
     * Example messageNodeStr:
     *   "<MESSAGE nogslang='en_uk' id='100'>
	 *     <TYPE>REALITYCHECK_UK</TYPE>
	 *     <TITLE>Responsible Gaming Reality Check</TITLE>
	 *     <TEXT>You have been playing for 1 minute, if you wish you can continue to play. Or exit the game.</TEXT>
	 *     <OPTIONS COUNT='3'>
	 *       <OPTION action='https://ogs-stage.nyxgib.eu/vf/realitycheck/271?request=realitycheck&amp;action=accept&amp;userid=630595434&amp;gamesessionid=fe85f6e2-ad86-435d-ab9d-c8321cbf0272&amp;gpgameid=70233&amp;currency=GBP&amp;apiversion=1.3&amp;ts=1538646574269' id='101'>PROCEED</OPTION>
	 *       <OPTION action='https://ogs-stage.nyxgib.eu/vf/realitycheck/271?request=realitycheck&amp;action=reject&amp;userid=630595434&amp;gamesessionid=fe85f6e2-ad86-435d-ab9d-c8321cbf0272&amp;gpgameid=70233&amp;currency=GBP&amp;apiversion=1.3&amp;ts=1538646574269' id='102'>EXIT</OPTION>
	 *       <OPTION action='https://www-stg1.coral.co.uk/account/history' id='103'>HISTORY</OPTION>
	 *     </OPTIONS>
	 *   </MESSAGE>"
     *
     * @param {String} messageNodeStr
     */
    handleMessageTrigger(messageNodeStr) {
        this._logger.integration.info("GCM.handleMessageTrigger(\n\tmessageNodeStr:", messageNodeStr, "\n)");

        if (messageNodeStr !== null) {
            try {
                const message = this.messageTrigger.getMessageFromXml(messageNodeStr);
                // Check if message obj is not empty (eg. UKGC Sync Message).
                if (Object.keys(message).length > 0) {

                    // As game lifecycle already has a callback to game.
                    // Only if handleMessageTrigger is called outside of game lifecycle, we need to explicitly call game.resume()
                    if(!this.gameStateController_.gameResumeCallback_) {
                        this.notificationHandler_.addEventListener(GCMEvent.COMPLETE, this.onHandleMessageTriggerComplete, this);
                    }
                    this.notificationHandler_.handleNotification(new GCMNotification(GCMNotification.TYPE.GENERIC_MESSAGE, message));
                }
            } catch(err) {
                this.handleError('CONNECTION_ERROR', 'ERROR', null, null);
            }
        }
    }

    /**
    * Event listener function used when message trigger notification handling is complete.
    * @private
    */
    onHandleMessageTriggerComplete() {

        this.notificationHandler_.removeEventListener(GCMEvent.COMPLETE, this.onHandleMessageTriggerComplete, this);
        this._logger.integration.info("GAME.resume()");
        this.game.resume();
    };

    /**
    * Helper method to send post-messages to gcm-launcher
    * This method accepts two parameters
    * @private
    * @param {string} methodName the method to be executed on gcm-launcher
    * @param {Object} methodParams the paramers to be passed to the method on gcm-launcher
    */
    sendPostMessageToGCMLauncher(methodName, methodParams) {
        var postMessage = this.createPostMessage(methodName, methodParams);

        // Send postMessage to gcm-launcher
        this.launcherWindow.postMessage(postMessage, this.launcherOrigin);
    }

    /**
        * Helper method to send post-messages to operator
        * This method accepts one parameter
        * @private
        * @param {Object} postMessage the parameter to be passed to operator
     */
    sendPostMessageToOperator(postMessage) {
            var operatorWindow;
             if(this.device != "desktop")
               {
               operatorWindow=this.launcherWindow.parent.parent
               }
               else{
               operatorWindow=this.launcherWindow.parent;
               }
            // Send postMessage to operator
            if(operatorWindow){
            operatorWindow.postMessage(postMessage,'*');
            }

        }
    /**
    *
    * Helper method to create a GCM Post Messsage(PM) Object
    * GCM PM Object has two data segments: 1. action, 2. params
    * @private
    * @param {string} action: The method to be called on post-message destination
    * @param {Object} params: The list of arguments to be passed to the method
    */
    createPostMessage(action, params) {
        var pmObject = {};

        pmObject["action"] = action;
        pmObject["params"] = params;

        return JSON.stringify(pmObject);
    };

    /**
    * Helper method to parse response from UrlUtil.getAllParams() to help
    * create ogsParams values.  This function is also present in gcm launcher.
    * @private
    * @param {string} urlString the url to have values extracted / read from.
    * @param {boolean} isDesktop used because desktop games just have '&'
    * query string values, but mobile has entire URL including '?' portion.
    */
    getOGSParams(urlString, isDesktop) {
        var searchParams = UrlUtil.getAllParams(urlString, isDesktop);
        var requestParams = {};
        searchParams.forEach(function(element) {
          if ("gameUrl" != name) {
            requestParams[element[0]] = decodeURIComponent(element[1]);
          }
        });
        return requestParams;
      }

    /**
     * The game should call this function when building game server requests. It should use the promoInfo
     * object returned to populate the game server request with the necessary promotions data
     *
     * @return {Object} promoInfo An object representing the currently active promotions. The format of
     * this object is defined by GCM - JSONSchema is available on request. An example is below:
     *
     * <p>
     * {
     *   "PROMOTIONS": {
     *     "GAMEPLAY": "complete",
     *     "FREEROUNDS": [
     *       {
     *         "CAMPAIGNID": "FW_10_SIGNUP",
     *         "ACTIVATIONID": "PROM_100002",
     *         "ENDDATE": "2016-11-08T12:00:00Z",
     *         "TOTALWIN": 31.1,
     *         "CAMPAIGNVALUE": 10,
     *         "REJECTABLE": true,
     *         "OPTIONS": [
     *           {
     *             "BETLEVEL": 2.5,
     *             "TOTALROUNDS": 4,
     *             "REMAININGROUNDS": 2,
     *             "FEATURE": ""
     *           }
     *         ]
     *       }
     *     ]
     *   }
     * }
     * </p>
     */
    getPromoInfo() {
        this._logger.integration.info("GCM.getPromoInfo()");

        return this.promotions.getPromoInfo()
    }

    /**
     * The game should call this function on GCM after building a promoInfo object containing the available promotions data.
     *
     * @param {Object} promoInfo An object representing the available promotions data. The format of
     * this object is defined by GCM - JSONSchema is available on request. An example is below:
     *
     * <p>
     * {
     *   "PROMOTIONS": {
     *     "GAMEPLAY": "complete",
     *     "FREEROUNDS": [
     *       {
     *         "CAMPAIGNID": "FW_10_SIGNUP",
     *         "ACTIVATIONID": "PROM_100002",
     *         "ENDDATE": "2016-11-08T12:00:00Z",
     *         "TOTALWIN": 0,
     *         "CAMPAIGNVALUE": 10,
     *         "REJECTABLE": false,
     *         "OPTIONS": [
     *           {
     *             "BETLEVEL": 2.5,
     *             "TOTALROUNDS": 4,
     *             "REMAININGROUNDS": 4,
     *             "FEATURE": ""
     *           },
     *           {
     *             "BETLEVEL": 5,
     *             "TOTALROUNDS": 2,
     *             "REMAININGROUNDS": 2
     *             "FEATURE": ""
     *           }
     *         ]
     *       },
     *       {
     *         ...
     *       }
     *     ]
     *   }
     * }
     * </p>
     */
    setPromoInfo(promoInfo) {
        this._logger.integration.info("GCM.setPromoInfo(\n\tpromoInfo:", promoInfo, "\n)");

        this.promotionsEnabled = true;
        this.promotions.setPromoInfo(promoInfo)
    }
}



// WEBPACK FOOTER //
// ./src/main/GcmCore.js