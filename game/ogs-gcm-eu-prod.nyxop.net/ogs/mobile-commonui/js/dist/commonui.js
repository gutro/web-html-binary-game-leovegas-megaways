function LanguageUtils(){ }

var currentLanguage;

LanguageUtils.getUserLanguage = function() {
  var lang = gcm_.getUrlParams().lang;
  
  if(lang === undefined || lang === null){
    lang = LanguageUtils.getUserLanguageDefault();
  }
   
  return lang;
};

LanguageUtils.getUserLanguageDefault = function() {
  return config.defaultLang;
};

LanguageUtils.formatCurrency = function(balance){
  //$100,830.95 - English
  //100 830,95 $ - French
      	
  if(LanguageUtils.getUserLanguage() === 'en'){
    if(balance.charAt(0) === '£'){
      return balance;
    }
      
    balance = balance.replace(' £', ''); //remove dollar sign at end
    balance = balance.split(',').join('.'); //replace decimal separator
    balance = balance.split(' ').join(','); //replace thousands separator
    balance = "$" + balance; //add dollar sign at beginning
      
  } else if(LanguageUtils.getUserLanguage() === 'fr'){
    if(balance.charAt(balance.length-1) === '$'){
      return balance;
    }
      
    balance = balance.replace('$', ''); //remove dollar sign at beginning
    balance = balance.split(',').join(' '); //replace thousands separator
    balance = balance.split('.').join(','); //replace decimal separator
    balance = balance + " $"; //add dollar sign at end
  }
    
  return balance;
};

function UrlUtils(){ }
UrlUtils.getUrlParams = function(name) {
  if ("v3" == gcmVersion) {
    return gcm_.urlutil.getSearchParameterByName(name, parent.window.location.search);
  } else {
    if (name in urlParams) {
        return urlParams[name];
    }
    return null;
  }
};

/**
 * (C) 2017 OpenBet Technologies Ltd. All rights reserved.<br>
 *
 *
 * The progressBar View will provide a loading bar
 * in the commonUI by adding the progressBar information
 * inside the loadingDisplayDiv tag in commonui.html.
 * The required methods have jsDoc documentation
 *
 */

function progressBarView() {
  }
  /**
   * The loadProgressUpdate function will
   * update the percent complete of the progressBar in the commonUI.
   * @param {number} percentComplete The loading completion percentage.
   */
progressBarView.prototype.loadProgressUpdate = function(percentComplete) {
  document.getElementById('progressBarPercentComplete').innerHTML = parseInt(percentComplete) + ' <span class="percent">%</span>';
};

/**
 * The progressBarHTML function will create the progressBar view
 * inside the loadingDisplayTag
 * in the commonUI.html.
 * @return {string} return the DOM string of preloader loading bar.
 */
progressBarView.prototype.progressBarHTML = function() {
  return '<div class="gameload-block">' +
         '  <div class="large-logo">' +
         '    <img src="imgs/openbet_games.png" alt="OpenBet Logo" />' +
         '  </div> ' +
         '  <div id="progressBarLoadingMessage">Loading Game</div>' +
         '  <div id="progressBarPercentComplete" style="padding-top: 5px">0 %</div>' +
         '</div>';
};

var commonUIDialogBox = function() {
  var displaying = false;

  var messageBoxStyle = {
    ERROR: 'ERROR',
    INFO: 'INFO',
    WARNING: 'WARNING',
    QUIT_CONTINUE: 'QUIT_CONTINUE',
    SUCCESS: 'success',
    REALITY_CHECK: 'REALITY_CHECK'
  };
  
  function showDialog(title, message, type, callback, quitCallback, errorCategory, errorParams, timeout) {
    //if there is a msg displaying, cancel display another one.
    if(displaying) {
      return false;
    }
    displaying = true;

    if (!type) {
      type = 'error';
    }

    var messageNode = document.createTextNode(message);
    if (errorParams !== null && typeof errorParams !== 'undefined' && typeof errorParams.errorCode !== 'undefined' && errorParams.errorCode === "REALITY_CHECK_MT") {
      cssClass = 'commonUI-message commonUI-message-malta';
      var message_list  = message.split("\n");
      messageNode = createDiv();
      messageNode.style['text-align'] = "left";
      message_list.forEach(function(line,idx){
        if (line !== "") {
          var para = document.createElement('p');
          para.appendChild(document.createTextNode(line));
          messageNode.appendChild(para);
        }
      });
    } else {
      cssClass = 'commonUI-message';
    }
	
	var dialogBoxContainer = document.getElementById('dialogBoxContainer');
	
    dialogBoxContainer.appendChild(
		createDiv('commonUI-message-id', cssClass,
			createDiv('commonUI-message-header-id', 'commonUI-message-header', null, document.createTextNode(title)),
			createDiv('commonUI-message-body-id', 'commonUI-message-body',
				createDiv('commonUI-message-text-id', 'commonUI-message-text', null, messageNode),
				createDiv('commonUI-message-buttons-id', 'commonUI-message-buttons', createButtons(type, callback, quitCallback, errorCategory, errorParams), null)
				)
			)
		);

      if (type === messageBoxStyle.REALITY_CHECK){
          var realityCheckBackdrop = createDiv('commonUI-realityCheck-backdrop', 'commonUI-dialog-backdrop', null, null);
          dialogBoxContainer.insertBefore(realityCheckBackdrop, dialogBoxContainer.querySelector('#commonUI-message-id'));
          addRealityCheckStyleToDialog();
      }

      dialogBoxContainer.querySelector('#commonUI-message-id').style.display = 'table';
    
    return true;
  }

    function addRealityCheckStyleToDialog() {
        document.getElementById('commonUI-message-id').classList.add('commonUI-message-realityCheck');
        document.getElementById('commonUI-message-header-id').classList.add('commonUI-message-header-realityCheck');
        document.getElementById('commonUI-message-body-id').classList.add('commonUI-message-body-realityCheck');
        document.getElementById('commonUI-message-text-id').classList.add('commonUI-message-text-realityCheck');
        document.getElementById('commonUI-message-buttons-id').classList.add('commonUI-message-buttons-realityCheck');
    }

  function isDisplaying() {
    return displaying;
  }
  
  function createDiv(id, cssClass, childNode, childNode2){
    var result = document.createElement('div');
    
    if(id) result.id = id;
    if(cssClass) result.className = cssClass;
    if(childNode) result.appendChild(childNode);
    if(childNode2) result.appendChild(childNode2);
    
    return result;
  }

 function createText(text){
    var result = document.createElement('div');
    
    text.split('\n').forEach(function(line){
      var paragraph = document.createElement("p");
      paragraph.appendChild(document.createTextNode(line));

      result.appendChild(paragraph);
    });
    
    return result;
  }
  
  function addHandler(element, handler, value, hideCallback){
    element.onclick = function() {
         handler(value);
         if (hideCallback === true) {
           hideDialog();
         }
     };
     return element;
  }
  
  function addStyle(element, style){
     element.setAttribute('style', style);
     return element;
  }
  
  function createButtons(type, callback, quitCallback, errorCategory, errorParams){
    var buttons = null;
    
    //MULTIPLE CHOICES
    if (errorCategory == "MULTI_CHOICE_DIALOG" && errorParams !== null && errorParams !== undefined){
      var paramsLength = errorParams.options.length;
      buttons = createDiv();
      errorParams.options.forEach(function(option,idx){
        
        var style = 'float:right;';
        var btn_class = "commonUI-message-buttons float_center";
        
        // When creating buttons for malta reality checks pop-up
        if (typeof errorParams !== 'undefined' && typeof errorParams.errorCode !== 'undefined' && errorParams.errorCode === "REALITY_CHECK_MT") {
          btn_class = 'button-confirm';
          style = 'float:left; padding-left:25%;';
        } else {
          if(paramsLength==2 && idx===0){
            style = 'float:left;';
          } else if (paramsLength>2){
            style = 'float:left; width:' + 99/paramsLength + '%; padding-left:5px; padding-right:5px;';
          } 
        }
       
        buttons.appendChild(
          addStyle(
            createDiv(null, btn_class,
              addHandler(
                createDiv(null, null, document.createTextNode(option) ),
                callback,
                idx,
                true
              )
            ),
            style)
        );
      });
    
    // VF REALITY CHECK
    } else if(errorCategory == "REALITY_CHECK" && errorParams !== null && errorParams !== undefined && errorParams.errorCode === "REALITY_CHECK_VF") {
      buttons = createDiv('rcpopup', 'commonUI-realitycheck-buttons');

      buttons.appendChild(createRealityChecksButton(errorParams.options[0], 0, 'button-confirm', callback, true));
      buttons.appendChild(createRealityChecksButton(errorParams.options[1], 1, "button-confirm", callback, true));
      buttons.appendChild(createRealityChecksButton(errorParams.options[2], 2, 'button-confirm', callback, false));
      
    // REALITY CHECK
    } else if(errorCategory == "REALITY_CHECK" && errorParams !== null) {
      buttons = createDiv('rcpopup', 'commonUI-realitycheck-buttons');

      buttons.appendChild(createRealityChecksButton(CUITranslations.xl('CONTINUE'), "CONTINUE", 'button-confirm', callback, true));
      buttons.appendChild(createRealityChecksButton(CUITranslations.xl('LOBBY'), "LOBBY", "button-confirm", callback, true));
      if (((((errorParams || {}).realityCheckInfo || {}).options || {}).history || {}).value) {
          buttons.appendChild(createRealityChecksButton(CUITranslations.xl('ACCOUNT_HISTORY'), "ACCOUNT_HISTORY", 'button-confirm', callback, false));
      }

    //QUIT & CONTINUE
    } else if(type===commonUIDialogBox.STYLE.QUIT_CONTINUE) {
      buttons = createDiv(null, null,
                  addHandler( createDiv(null, "button-confirm", document.createTextNode(CUITranslations.xl('QUIT'))), quitCallback, true),
                  addHandler( createDiv(null, "button-confirm", document.createTextNode(CUITranslations.xl('CONTINUE'))), callback, true)
                );
                
    //OK
    } else {
	  
      buttons = createDiv(null, "commonUI-message-buttons float_center",
                  addHandler( createDiv(null, "button-confirm", document.createTextNode(CUITranslations.xl('OK'))), callback, true, true)
                );
    }
    
    return buttons;
  }
  
  function hideDialog(errorParamIndex) {
    var dialog = document.getElementById('dialogBoxContainer');
    while(dialog.firstChild) dialog.removeChild(dialog.firstChild);

    displaying = false;
  }

  function createRealityChecksButton(buttonLabel, buttonAction, className, callback, hideCallback) {
    return createDiv(null, className,
             addHandler(
               createDiv(null, null, document.createTextNode(buttonLabel) ),
               callback,
               buttonAction,
               hideCallback
             )
           );
  }


  return {
    STYLE: messageBoxStyle,
    show: showDialog,
    isDisplaying: isDisplaying
  };
}();

var commonUIFRDialogBox = function () {

  //Button Styles defined in commonui.css
  var FR_BUTTON_STYLES = {
    DEFAULT: "",
    GREY: "fr-button-grey"
  };
  //Type of Free Rounds message boxes to display
  var FR_SCREEN_TYPE = {
    PICK: "PICK",
    SUMMARY: "SUMMARY",
    PROGRESS: "PROGESS"
  };

  var selectedOption = null;
  var displayed = false;

  //Entry point to start constructing the appropriate message box
  function showFreeRoundsMessage(freeRoundsInfo, callback) {
    if (displayed)
      return false;
    displayed = true;

    var status = freeRoundsInfo.STATUS;

    //Check the status to determine which message box to construct
    switch (status) {
      case "notstarted":
        createFRPickScreen(freeRoundsInfo, callback);
        break;
      case "completed":
        createFRSummaryScreen(freeRoundsInfo, callback);
        break;
      case "inprogress":
        createFRProgressScreen(freeRoundsInfo, callback);
        break;
    }
  }

//  DIFFERENT SCREEN CONSTRUCTION METHODS
  //This passes the parameters to the screen constructor for the screen that will display the 4 (or less) options that the player can choose
  function createFRPickScreen(freeRoundsInfo, callback) {
    var headerText = "FREE ROUNDS";
    var headerSubText = (freeRoundsInfo.OPTIONS.length > 1) ? "Free Rounds Awarded - Please choose your option" : "Free Rounds Awarded";
    var headerObj = { mainHeader: { text: headerText, css: "fr-message-header" }, subHeader: { text: headerSubText, css: "fr-header-text" } };
    createFRScreen(freeRoundsInfo,headerObj, FR_SCREEN_TYPE.PICK, freeRoundsInfo.REJECTABLE, function () {
      callback(selectedOption.betLevel);
    });
  }
  //This passes the parameters to the screen constructor for the final summary screen
  function createFRSummaryScreen(freeRoundsInfo, callback) {
    var headerText = "FREE ROUNDS";
    var headerSubText = (freeRoundsInfo.TOTALWIN > 0)? "CONGRATULATIONS!" : "";
    var headerObj = { mainHeader: { text: headerText, css: "fr-message-congrats-header" }, subHeader: { text: headerSubText, css: "fr-header-text-congrats" } };
    createFRScreen(freeRoundsInfo,headerObj, FR_SCREEN_TYPE.SUMMARY, freeRoundsInfo.REJECTABLE, callback);
  }
  //This passes the parameters to the screen constructor for the screen that when you enter a game with a free rounds in progress
  function createFRProgressScreen(freeRoundsInfo, callback) {
    var headerText = "FREE ROUNDS";
    var headerSubText = "CONGRATULATIONS!";
    var headerObj = { mainHeader: { text: headerText, css: "fr-message-header" }, subHeader: { text: headerSubText, css: "fr-header-text-congrats" } };
    createFRScreen(freeRoundsInfo, headerObj, FR_SCREEN_TYPE.PROGRESS, freeRoundsInfo.REJECTABLE, callback);
  }

  //General construction of the Free Rounds message based on the type required
  function createFRScreen(freeRoundsInfo,headerObj, screenType, isRejectable, callback) {

    var msgBoxItems = [];
    msgBoxItems.push(createFRHeader(headerObj.mainHeader, headerObj.subHeader));
    msgBoxItems.push(createDiv(null, "fr-option-container", null, createBodyItems(freeRoundsInfo, screenType)));
    msgBoxItems.push(createFRButtons(createButtonList(screenType, isRejectable, callback)));

    createMsgBox(msgBoxItems);
  }
//END OF SCREEN CONSTRUCTION METHODS

  //Create the appropriate buttons to display (right now it depends on if the offer is Rejectable)
  function createButtonList(screenType, isRejectable, callback) {
    var buttonList = [];

    if (FR_SCREEN_TYPE.PICK == screenType && isRejectable) {
      buttonList.push(createButton(null, FR_BUTTON_STYLES.DEFAULT, "USE NOW", callback));
      buttonList.push(createButton(null, FR_BUTTON_STYLES.GREY, "USE LATER", function(){
        setCurrentOptionSelected(selectedOption.option, 0);
        callback();
      }));
    } else
      buttonList.push(createButton(null, FR_BUTTON_STYLES.DEFAULT, "OK", callback));

    return buttonList;
  }

  //Create the body of the Free Rounds message box depending on the type (Multiple Pick Options or just Text)
  function createBodyItems(freeRoundsInfo, screenType) {
    var options = freeRoundsInfo.OPTIONS;

    switch (screenType) {
      case FR_SCREEN_TYPE.PICK:
        return createPickBodyItems(options);
      case FR_SCREEN_TYPE.SUMMARY:
        return createSummaryBodyItems(freeRoundsInfo);
      case FR_SCREEN_TYPE.PROGRESS:
        return createProgressBodyItems(freeRoundsInfo);
      default:
        return [];
    }
  }

  //This creates the individual option boxes that the player can choose from. If there is only 1 option it will just display text instead of the actual box
  function createPickBodyItems(options) {
    var bodyList = [];

    if (options.length > 1) {
      for (var index = 0; index < options.length; index++) {
        var currentOption = options[index];
        var optionObj = createFROptionsBody(currentOption.TOTALROUNDS, currentOption.BETLEVEL_FMT, currentOption.BETLEVEL);

        if (index === 0)
          setCurrentOptionSelected(optionObj, currentOption.BETLEVEL);

        bodyList.push(optionObj);
      }
    } else {
      var option = options[0];
      var msgText = "You have " + option.TOTALROUNDS + " Free Rounds at " + option.BETLEVEL_FMT;
      setCurrentOptionSelected(null, option.BETLEVEL);

      msgText.split("\n").forEach(function (element) {
        bodyList.push(createText("p", null, "fr-message-body-text", element));
      });
    }

    return bodyList;
  }

  //This creates the summary box text, based on the total win amount and which buttons to display
  function createSummaryBodyItems(freeRoundsInfo) {
    var bodyList = [];
    var summaryText = "You have won " + freeRoundsInfo.TOTALWIN_FMT + " in Free Rounds\nFree Rounds has now ended.\n<b>Funds will now be used from your account</b>";

    summaryText.split("\n").forEach(function (element) {
      bodyList.push(createText("div", null, "fr-message-body-text", element));
    });

    var textDiv = [createDiv(null,"fr-body-text-container",null,bodyList)];

    return textDiv;
  }

  //This creates the text for the progress screen, based on the remaining free rounds
  function createProgressBodyItems(freeRoundsInfo) {
    var bodyList = [];

    var freeRoundText = (freeRoundsInfo.OPTIONS[0].REMAININGROUNDS === 1)? "Free Round" : "Free Rounds";

    var summaryText = "You have " + (freeRoundsInfo.OPTIONS[0].REMAININGROUNDS) + " " + freeRoundText + ".\nGood Luck!";

    summaryText.split("\n").forEach(function (element) {
      bodyList.push(createText("div", null, "fr-message-body-text", element));
    });

    var textDiv = [createDiv(null,"fr-body-text-container",null,bodyList)];

    return textDiv;
  }

  //This is the Main message box. The constructed header, body and button sections are added to this as children and then added to the dialogBoxContainer div to display
  function createMsgBox(msgBoxItems) {
    var frMsgBox = createDiv(null, "commonUI-message fr-message-box", null, msgBoxItems);

    var dialogBoxContainer = document.getElementById('dialogBoxContainer');
    dialogBoxContainer.appendChild(frMsgBox);
  }

  //This constructs the header layout that appears at the top of the message box
  function createFRHeader(mainText, subText) {
    var headerDiv =
      createDiv(null, mainText.css, null, [
        createDiv(null, "fr-header-title", null, [
          createText("span", null, null, mainText.text)
        ]),
        createDiv(null, subText.css, null, [
          createText("span", null, null, subText.text)
        ]),
      ]);

    return headerDiv;
  }

  //This constructs the layout of the body of each of the individual player option during the pick screen
  function createFROptionsBody(numSpins, spinValue, betLevel) {
    var msgBodyDiv =
      createDiv(null, "fr-spin-option fr-spin-option-txt", function () { setCurrentOptionSelected(this, betLevel); }, [
        createDiv(null, "fr-spin-option-header", null, [
          createText("span", "frSpinAmount", "fr-spin-option-spinsNumTxt", numSpins),
          createText("span", null, "fr-spin-option-spinsTxt", "SPINS")
        ]),
        createDiv(null, "fr-spin-option-body", null, [
          createText("span", null, "fr-spin-option-valueTxt", "AT"),
          createText("span", "frSpinAmount", "fr-spin-option-valueNumTxt", spinValue)
        ])
      ]);

    return msgBodyDiv;
  }

  //This constructs the layout of the bottons that will appear below the header
  function createFRButtons(objButtons) {

    var btnList = [];

    objButtons.forEach(function (element) {
      btnList.push(element);
    });

    var msgButtonsDiv = createDiv(null, "commonUI-message-buttons fr-message-buttons", null, btnList);

    return msgButtonsDiv;
  }

  //Method to create a div, these can be nested together to make an html dom element
  function createDiv(id, cssClass, actions, childElements) {
    var newDiv = document.createElement('div');

    if (id) newDiv.id = id;
    if (cssClass) newDiv.className = cssClass;
    if (childElements) {
      childElements.forEach(function (element) {
        newDiv.appendChild(element);
      }, this);
    }

    if (actions) newDiv.onclick = actions;

    return newDiv;
  }

  //Create a portion of text to add to the html dom (type passed in describes it if is <p>,<span><h1>...etc)
  function createText(type, id, cssClass, text) {
    var newTextItem = document.createElement(type);

    if (id) newTextItem.id = id;
    if (cssClass) newTextItem.className = cssClass;
    if (text) newTextItem.innerHTML = text;

    return newTextItem;
  }

  //Creates the look of an individual button
  function createButton(id, style, label, callback) {
    var buttonDiv = createDiv(id, "button-confirm fr-button", callback, [createText("span", null, null, label)]);
    if (style)
      buttonDiv.classList.add(style);
    return buttonDiv;
  }

  //Hides the Free Rounds dialog that is currently open
  function hideDialog(errorParamIndex) {
    var dialog = document.getElementById('dialogBoxContainer');
    while (dialog.firstChild) dialog.removeChild(dialog.firstChild);

    displayed = false;
  }

  //This holds which player option is currently selected and highlights it for the player to know  which is currently selected
  function setCurrentOptionSelected(obj, betLevel) {
    if (selectedOption && selectedOption.option) {
      selectedOption.option.classList.remove("fr-option-highlight");
    }

    selectedOption = { option: obj, betLevel: betLevel };

    if (selectedOption.option) {
      selectedOption.option.classList.add("fr-option-highlight");
    }
  }

  function isDisplayed() {
    return displayed;
  }

  return {
    showFreeRoundsMessage: showFreeRoundsMessage,
    isDisplayed: isDisplayed,
    hideDialog: hideDialog
  };
}();
var commonUIMessageDialogBox = function() {

  var displaying = false;

  //Message Box Styles.
  var messageBoxStyle = {
    CMA: 'message-box-cma',
    RC: 'message-box-rc'
  };

  /**
   * Entry point to start constructing the appropriate message box.
   *
   * @param {string} title The title of the message.
   * @param {string} message The body of the message.
   * @param {Array#object} options The message options.
   * @param {string} type The message type can be CMA or RC.
   * @param {object} callback The callback function.
   */
  function showDialog(title, message, options, type, callback) {
    //if there is a msg displaying, cancel display another one.
    if(displaying) {
      return false;
    }
    displaying = true;

    var cssClass = 'commonUI-message ' + messageBoxStyle[type];
	
    var dialogBoxContainer = document.getElementById('dialogBoxContainer');

    dialogBoxContainer.appendChild(
      createDiv('commonUI-message-id', cssClass, null, [
        createDiv('commonUI-message-header-id', 'commonUI-message-header', null, [createText("span", null, null, title)]),
        createDiv(null, 'commonUI-message-body', null, [
          createDiv(null, 'commonUI-message-text', null, [createText("span", null, null, message)]),
          createDiv(null, 'commonUI-message-buttons', null, createMessageButtons(options, callback))
        ])
      ])
    );
	
	  dialogBoxContainer.firstChild.style.display = 'table';
    
    return true;
  }

  /**
   * Method to create a div, this can be nested together to make an html dom element.
   *
   * @param {string} id The id of the dom element.
   * @param {string} cssClass The class of the dom element.
   * @param {String} actions The action to be binned with the button click.
   * @param {Array#element} childElements List of children dom elements.
   */
  function createDiv(id, cssClass, actions, childElements) {
    var newDiv = document.createElement('div');

    if (id) newDiv.id = id;
    if (cssClass) newDiv.className = cssClass;
    if (childElements) {
      childElements.forEach(function (element) {
        newDiv.appendChild(element);
      }, this);
    }

    if (actions) newDiv.onclick = actions;

    return newDiv;
  }

  /**
   * Method to create a text node.
   *
   * @param {string} id The id of the dom element.
   * @param {string} type The type of the dom element wrapper (eg. span, div etc.).
   * @param {string} cssClass The class of the dom element.
   * @param {String} text The text of the dom element.
   */
  function createText(type, id, cssClass, text) {
    var newTextItem = document.createElement(type);

    if (id) newTextItem.id = id;
    if (cssClass) newTextItem.className = cssClass;
    if (text) {
      text.split('\n').forEach(function (line) {
        var paragraph = document.createElement("p");
        line.split('\\n').forEach(function (subLine) {
          var textNode = document.createElement("span");
          textNode.innerHTML = subLine;
          var brNode = document.createElement('br');
          paragraph.appendChild(textNode);
          paragraph.appendChild(brNode);
        });

        newTextItem.appendChild(paragraph);
      });
    }
    return newTextItem;
  }

  /**
   * Method to create the Message Box Buttons.
   *
   * @param {Array#object} options The message options.
   * @param {object} callback The callback function.
   */
  function createMessageButtons(options, callback) {
    var buttonsList = [];

    if (options.length > 0) {
      options.forEach(function (option) {
        buttonsList.push(createMessageButton(option.ID, option.BODY,  option.ACTION, callback));
      });
    } else {
      // Add Close button if there are no other options.
      buttonsList.push(createMessageButton(200, 'Close',  null, callback));
    }
    return buttonsList;
  }

  /**
   * Method to create the Message Box Button and bind it with the appropriate functionality.
   *
   * @param {string} id The option's id that defines the button's functionality.
   * @param {string} label The button's label.
   * @param {string} url The option's url used by the button's functionality.
   * @param {object} callback The callback function.
   */
  function createMessageButton(id, label, url, callback) {
    var actions = null;
    switch (id) {
      case 0:   // Continue.
      case 101: // Accept RC and Continue.
      case 104: // Accept an offer and Continue.
      case 105: // Decline an offer and Continue.
      case 200: // Close the Dialog.
        actions = close(url, callback);
        break;
      case 103: // Redirect.
      case 106: // Logout.
        actions = closeRedirect(url, callback);
        break;
      case 100: // Close	the message box and also close the game client.
        actions = closeReturnToLobby(null, callback);
        break;
      case 102:
        actions = closeReturnToLobby(url, callback);
        break;
      default:
        actions = closeReturnToLobby(null, callback);
    }
    return createDiv('commonUI-message-button-' + id, 'commonUI-message-button', actions, [createText("span", null, null, label)]);
  }

  /**
   * Method that returns a function that
   * 1. does async request (if url is provided)
   * 2. executes the callback.
   *
   * @param {string} url The option's url (optional) for the get request.
   * @param {object} callback The callback function.
   */
  function close(url, callback) {
    return function() {
      getXhr(url);
      callback();
    };
  }

  /**
   * Method that returns a function that
   * 1. redirects to url (if url is provided)
   * 2. executes the callback.
   *
   * @param {string} url The option's url for the redirect.
   * @param {object} callback The callback function.
   */
  function closeRedirect(url, callback) {
    return function() {
      redirectTo(url);
      callback();
    };
  }

  /**
   * Method that returns a function that
   * 1. does async request (if url is provided)
   * 2. redirects to Lobby.
   * 3. executes the callback.
   *
   * @param {string} url The option's url for the redirect.
   * @param {object} callback The callback function.
   */
  function closeReturnToLobby(url, callback) {
    return function() {
      var xhr = getXhr(url);
      if (xhr) {
        xhr.complete(function() {
          CUIScreenManager.returnToLobby();
          callback();
        });
      } else {
        CUIScreenManager.returnToLobby();
        callback();
      }
    };
  }

  /**
   * Method that does async call requests.
   * @param {string} url The url to execute the request.
   * @returns {object} getXhr The xhr object.
   */
  function getXhr(url) {
    var getXhr = null;
    if (url) {
      // Async Get Request to url.
      // We do not check if the request was successful.
      getXhr = $.ajax({
        type: 'GET',
        url: url
      });
    }
    return getXhr;
  }

  /**
   * Method that does redirect.
   * @param {string} url The url to redirect.
   */
  function redirectTo(url) {
    if (url) {
      CUIScreenManager.sendPostMessageToOperator({"gcmevent": "redirect",url: url});
      if (window != window.top) {
        window.top.location.href = url;
      } else {
        window.location.href = url;
      }
    }
  }

  //Method that hides the dialog.
  function hideDialog() {
    var dialog = document.getElementById('dialogBoxContainer');
    while(dialog.firstChild) dialog.removeChild(dialog.firstChild);

    displaying = false;
  }

  return {
    hideDialog: hideDialog,
    show: showDialog
  };

}();

var gameSparkElem = function() {

var gsLoaded = false;
var minimumWagerAmt;
var stakeAmt=0;
var minWagerFormattedAmt;

    function checkMinimumWager(stake){
        stakeAmt=stake.value;
        if(gsLoaded){
            var gsFrame=document.getElementById("gsIframe");
            var messageObject = {stakeAmt:stake.value,minimumWagerAmt:minimumWagerAmt,minWagerFormattedAmt:minWagerFormattedAmt};
            gsFrame.contentWindow.postMessage(messageObject,window.origin);
          }

    }

  function createMissionUI(message) {
        minimumWagerAmt=message.data.minWager
        minWagerFormattedAmt=currencyFormat.format(message.data.minWager).display
        message.minimumWagerAmt=minimumWagerAmt;
        message.minWagerFormattedAmt=minWagerFormattedAmt
        message.stakeAmt=stakeAmt;
        if(document.getElementById("gsIframe")){
             var messageObject = {};
             messageObject["action"] = "handleGSTrigger";
             messageObject["params"] = message.data;
             var gsMessage = JSON.stringify(messageObject);
             document.getElementById("gsIframe").contentWindow.postMessage(message,window.origin);
        }
        else{
            var gsContainer=document.getElementById("gamesparkContainer");
            var gsURL = "gamesparks/gamespark.html";
            var gsFrame = document.createElement('iframe');
            gsFrame.setAttribute("src", gsURL);
            gsFrame.setAttribute('id', 'gsIframe');
            gsFrame.setAttribute('name', 'gsPanel');
            gsFrame.style.border = 'none';
            gsFrame.style.width = "100%";

            gsContainer.appendChild(gsFrame);
            gsFrame.onload = function(){
             var messageObject = {};
             messageObject["action"] = "handleGSTrigger";
             messageObject["params"] = message.data;
             var gsMessage = JSON.stringify(messageObject);
             gsFrame.contentWindow.postMessage(message,window.origin);
             gsLoaded=true;
            }
        }

  }

  return {
      createMissionUI: createMissionUI,
      checkMinimumWager:checkMinimumWager
  };

}();
var commonUISJDialogBox = function() {

  var displaying = false;

  /**
   * Entry point to start constructing the appropriate message box.
   *
   * @param {string} title The title of the message.
   * @param {string} message The body of the message.
   * @param {object} callback The callback function.
   */
  function showDialog(title, message, callback) {
    //if there is a msg displaying, cancel display another one.
    if(displaying) {
      return false;
    }
    displaying = true;

    var cssClass = 'sj-message';
    
    var dialogBoxContainer = document.getElementById('dialogBoxContainer');

    dialogBoxContainer.appendChild(
      createDiv('sj-message-id', cssClass, null, [
        createDiv('sj-message-header-id', 'sj-message-header', null, [createText("span", null, null, title)]),
        createDiv(null, 'sj-message-body', null, [
          createDiv(null, 'sj-message-text', null, [createText("span", null, null, message)]),
          createDiv(null, 'sj-message-buttons', null, [createMessageButton('ok', 'OK', callback)])   
        ])
      ])
    );
    
      dialogBoxContainer.firstChild.style.display = 'table';
    
    return true;
  }

  /**
   * Method to create a div, this can be nested together to make an html dom element.
   *
   * @param {string} id The id of the dom element.
   * @param {string} cssClass The class of the dom element.
   * @param {String} actions The action to be binned with the button click.
   * @param {Array#element} childElements List of children dom elements.
   */
  function createDiv(id, cssClass, actions, childElements) {
    var newDiv = document.createElement('div');

    if (id) newDiv.id = id;
    if (cssClass) newDiv.className = cssClass;
    if (childElements) {
      childElements.forEach(function (element) {
        newDiv.appendChild(element);
      }, this);
    }

    if (actions) newDiv.onclick = actions;

    return newDiv;
  }

  /**
   * Method to create a text node.
   *
   * @param {string} id The id of the dom element.
   * @param {string} type The type of the dom element wrapper (eg. span, div etc.).
   * @param {string} cssClass The class of the dom element.
   * @param {String} text The text of the dom element.
   */
  function createText(type, id, cssClass, text) {
    var newTextItem = document.createElement(type);

    if (id) newTextItem.id = id;
    if (cssClass) newTextItem.className = cssClass;
    if (text) {
     var paragraph = document.createElement('p');
     //paragraph.appendChild(document.createTextNode(text));
     paragraph.innerHTML = text;
     newTextItem.appendChild(paragraph);
    }
    return newTextItem;
  }

  /**
   * Method to create the Message Box Button and bind it with the appropriate functionality.
   *
   * @param {string} id The option's id that defines the button's functionality.
   * @param {string} label The button's label.
   * @param {object} callback The callback function.
   */
  function createMessageButton(id, label, callback) {
    var actions = close(callback);
    return createDiv('sj-message-button-' + id, 'sj-message-button', actions, [createText("span", null, null, label)]);
  }

  /**
   * Method that returns a function that
   * 1. executes the callback.
   *
   * @param {object} callback The callback function.
   */
  function close(callback) {
    return function() {
        callback();
    };
  }

  //Method that hides the dialog.
  function hideDialog() {
    var dialog = window.document.getElementById('dialogBoxContainer');
    while(dialog.firstChild) dialog.removeChild(dialog.firstChild);

    CUIScreenManager.releaseFullScreen();

    gcm_.syndicateJackpotWinAwardDialogClosed();      
    gcm_.resume();
    displaying = false;
  }

  return {
    hideDialog: hideDialog,
    show: showDialog,
    createDiv: createDiv,
    createText: createText,
    close: close,
  };

}();
/** liveServElem is implemented for show win notification*/
var liveServElem = {};

/**
 * To show dialog box with messages
 * @param {object} payloadInfo  *
 */
liveServElem.showUI = function(payloadInfo) {
  var payload = JSON.parse(payloadInfo);
  CUIScreenManager.takeFullScreen(true);
  currencyFormat.init(",", ".", urlParams["currency"]);
  var title = CUITranslations.xl("SJ_MSG0") + '!';

  var msg = "<br>" +CUITranslations.xl("SJ_MSG1") + "<br><br>";
      msg+= CUITranslations.xl("SJ_MSG2") + " <span class='sj_text'>" + currencyFormat.format(payload.playerWinAmount).display +"</span><br><br>";
      msg+= CUITranslations.xl("SJ_MSG3") + " <span class='sj_text'>" + payload.syndicationName + "</span> ";
      msg+= CUITranslations.xl("SJ_MSG4") + " <span class='sj_text'>" + currencyFormat.format(payload.playerContributionAmount).display + "</span> ";
      msg+= CUITranslations.xl("SJ_MSG5") + "<br><br>";
      msg+= CUITranslations.xl("SJ_MSG6") + " <span class='sj_text'>" + payload.playerWinPercentage + "%</span> ";
      msg+= CUITranslations.xl("SJ_MSG7") + "<br><br>";
      msg+= CUITranslations.xl("SJ_MSG8") + " <span class='sj_text'>" + currencyFormat.format(payload.jackpotTotalWinAmount).display + "</span>";

  commonUISJDialogBox.show(title, msg, commonUISJDialogBox.hideDialog);
};


var CUIJackpotNotificationsMessages = function()
{
    /*
    * The handler of the time-out.
    */
    var timeOutHandler = null;
    /*
    * The variable
    */
    var displaying = false;

    /*
    * The function shows the 'Congratulations' and the 'Calculating' message.
    * @param {int} timeout The timeout interval.
    */
    function launchNotifications(attributes)
    {
       // First, check if the notifications dialogs shows any message.
       if(displaying)
       {
            return false;
       }

       displaying = true;

       // 1. Show the first message dialog.
       showWinNotification();
       timeOutHandler = setTimeout(function ()
               {
                   // 2. Hide the first message dialog.
                   hide();

                   // 3. Show the second message dialog.
                   showWaitNotification();

                   timeOutHandler = setTimeout(function () {
                       hide();
                   }, attributes.timeout);
                   return true;
               }
               , attributes.timeout);
       return false;
    }

    /*
    * The function shows the dialog with the 'Congratulations' message.
    */
    function showWinNotification()
    {
        CUIScreenManager.takeFullScreen(true);
        var cssClass = 'sj-message';
        var dialogBoxContainer = document.getElementById('dialogBoxContainer');

        dialogBoxContainer.appendChild(
            commonUISJDialogBox.createDiv('sj-message-id', cssClass, null, [
                commonUISJDialogBox.createDiv('sj-message-header-id', 'sj-message-header', null, []),
                commonUISJDialogBox.createDiv('sj-message-header-coins', 'sj-message-coins', null, []),
                commonUISJDialogBox.createDiv(null, 'sj-message-body', null, [
                    commonUISJDialogBox.createDiv('sj-progress-message', 'sj-progress-message-text', null, [commonUISJDialogBox.createText("div", null, null, CUITranslations.xl("SJ_MSG9"))]),
                    commonUISJDialogBox.createDiv('sj-progress-winning-calculated', 'sj-progress-message-text-small', null, [commonUISJDialogBox.createText("div", null, null, CUITranslations.xl("SJ_MSG10"))]),
                    commonUISJDialogBox.createDiv('sj-progress-wait', 'sj-progress-message-text-small', null, [commonUISJDialogBox.createText("div", null, null, CUITranslations.xl("SJ_MSG11"))]),
                    createMessageProgress()
                ])
            ])
        );

        dialogBoxContainer.firstChild.style.display = 'table';
        return true;
    }

    /*
    * The function shows the dialog with the 'Still Calculating' message.
    */
    function showWaitNotification()
    {
        CUIScreenManager.takeFullScreen(true);

        displaying = true;
        var cssClass = 'sj-message';
        var dialogBoxContainer = document.getElementById('dialogBoxContainer');
        dialogBoxContainer.appendChild(
             commonUISJDialogBox.createDiv('sj-message-id', cssClass, null, [
                commonUISJDialogBox.createDiv(null, 'sj-message-body', null, [
                    commonUISJDialogBox.createDiv(null, 'sj-progress-message-text', null, [commonUISJDialogBox.createText("span", null, null, CUITranslations.xl("SJ_MSG12"))]),
                    commonUISJDialogBox.createDiv(null, 'sj-progress-message-text-small', null, [commonUISJDialogBox.createText("span", null, null, CUITranslations.xl("SJ_MSG13"))]),
                    createMessageProgress() //commonUISJDialogBox.createDiv(null, 'sj-message-progress loader', null, [])
                    ])
              ])
         );

         dialogBoxContainer.firstChild.style.display = 'table';

         return true;
    }

    /*
    * The function returns the <div> element with the loader gif.
    */
    function createMessageProgress()
    {
        return commonUISJDialogBox.createDiv('sj-message-progress', 'sj-message-progress loader', null, []);
    }

    /*
    * The function closes the dialog box.
    */
    function hide()
    {
        if (displaying) {
            clearTimeout(timeOutHandler);
            var dialog = window.document.getElementById('dialogBoxContainer');
            while(dialog.firstChild) dialog.removeChild(dialog.firstChild);
            CUIScreenManager.releaseFullScreen();
            gcm_.resume();
            displaying = false;
        }
    }

    return{
        launch: launchNotifications,
        hide: hide
    };
}();
var CUIOptions = {};

CUIOptions.options = {};

/**
 * GCM will call regOption on the commonUI when a game has registered that they support this option.
 * The commonUI must then display this option somewhere so that the user is able to control it.
 * This is an optional call for the game to make to GCM.
 */
CUIOptions.regOption = function (optionType, initialValue) {
  CUIOptions.options[optionType] = initialValue;

  switch (optionType) {
    case 'MUTE':
      document.getElementById('settingsSoundOption').style.display = 'block';
      CUIOptions.updateMuteIcon();
      break;
    case 'PAYTABLE':
      break;
    case 'HELP':
      document.getElementById('settingsGameInfoOption').style.display = 'none';
      document.getElementById('settingsHelpOption').style.display = 'block';
      break;
    case 'GAME_PREFERENCES':
      break;
  }
};

/**
 * GCM will call this when the option has been changed by the game
 * The commonUI should respond by changing the UI for the option in the menu to the new value
*/
CUIOptions.optionHasChanged = function(optionType, newValue) {
  CUIOptions.options[optionType] = newValue;
  switch (optionType) {
  case 'MUTE':
    CUIOptions.updateMuteIcon();
    break;
  case 'TURBO':
    CUIOptions.updateTurboIcon();
    break;
  case 'ABOUT':
    break;
  case 'HELP':
    CUIOptions.options.HELP = newValue;
    break;
  case 'PAYTABLE':
    CUIOptions.options.PAYTABLE = newValue;
    break;
  }
};

CUIOptions.toggleAbout = function() {
  CUIOptions.options.ABOUT = !CUIOptions.options.ABOUT;
  CUIScreenManager.minimizeTopbar();
  gcm_.optionHasChanged('ABOUT', 'COMMONUI', CUIOptions.options.ABOUT);

  ga('send', {
    hitType: 'event',
    eventCategory: 'COMMONUI',
    eventAction: 'ABOUT'
  });
};
  
CUIOptions.toggleHelp = function() {
  CUIOptions.options.HELP = !CUIOptions.options.HELP;
  CUIScreenManager.minimizeTopbar();
  gcm_.optionHasChanged('HELP', 'COMMONUI', CUIOptions.options.HELP);

  ga('send', {
    hitType: 'event',
    eventCategory: 'COMMONUI',
    eventAction: 'HELP'
  });
};

CUIOptions.toggleMute = function() {
  CUIOptions.options.MUTE = !CUIOptions.options.MUTE;
  gcm_.optionHasChanged('MUTE', 'COMMONUI', CUIOptions.options.MUTE);

  CUIOptions.updateMuteIcon();

  ga('send', {
    hitType: 'event',
    eventCategory: 'COMMONUI',
    eventAction: 'MUTE'
  });
};

CUIOptions.updateMuteIcon = function() {
  if (CUIOptions.options.MUTE) {
    document.getElementById("settingsSoundOption").classList.add("icon-sound-off");
    document.getElementById("fr-settingsSoundOption").classList.add("icon-sound-off");
    document.getElementById("fr-settingSoundOptionBG").classList.add("fr-ib-red");
  } else {
    document.getElementById("settingsSoundOption").classList.remove("icon-sound-off");
    document.getElementById("fr-settingsSoundOption").classList.remove("icon-sound-off");
    document.getElementById("fr-settingSoundOptionBG").classList.remove("fr-ib-red");
  }
};

var CUIConstants = {};

CUIConstants.RESPONSIBLE_GAMING_URL = "responsiblegaming_url";
CUIConstants.ELAPSED_TIME = "elapsedtime";


var CUIScreenManager = {};

CUIScreenManager.isExpanded = false;
CUIScreenManager.isFullScreenTaken = false;
CUIScreenManager.settingsOpen = false;
CUIScreenManager.progressBarEnabled = true;
CUIScreenManager.gameLoadingScreen = false;

CUIScreenManager.DEFAULT_WIDTH = 1024;
CUIScreenManager.DEFAULT_HEIGHT = 768;
CUIScreenManager.DEFAULT_COMMONUI_HEIGHT_EXPAND = '64px';
CUIScreenManager.DEFAULT_COMMONUI_HEIGHT_TOGGLE = 30;
CUIScreenManager.DEFAULT_COMMONUI_WIDTH_TOGGLE = 70;
CUIScreenManager.COMMONUI_HEIGHT_MAXIMUM = '60px';
CUIScreenManager.COMMONUI_HEIGHT_MEDIUM = '32px';
CUIScreenManager.COMMONUI_HEIGHT_EXPAND = CUIScreenManager.DEFAULT_COMMONUI_HEIGHT_EXPAND + 'px';
CUIScreenManager.COMMONUI_HEIGHT_TOGGLE = CUIScreenManager.DEFAULT_COMMONUI_HEIGHT_TOGGLE + 'px';
CUIScreenManager.COMMONUI_WIDTH_TOGGLE = function(){ return CUIScreenManager.DEFAULT_COMMONUI_WIDTH_TOGGLE + 'px'; };
var gsIframe=document.getElementById("gsIframe");

CUIScreenManager.gameAnimationStart = function() {

    /*if(!CUIGameSparks.isShowing()){
        CUIScreenManager.minimizeTopbar();
        CUIScreenManager.disableUI();
    }else {
        // disable UI too?
        CUIGameSparks.fade();
    }*/
    if(gsIframe){
        CUIGameSparks=gsIframe.contentWindow.CUIGameSparks;
        if(CUIGameSparks.isShowing()) {
        CUIGameSparks.fade();
        }
        else{
        CUIScreenManager.minimizeTopbar();
        CUIScreenManager.disableUI();
        }
    }
    else{
    CUIScreenManager.minimizeTopbar();
    CUIScreenManager.disableUI();
     }
};

/**
 * Called by gcm when the game play animation is complete. The commonUI is now
 * free to display content wherever it wants
 */
CUIScreenManager.gameAnimationComplete = function() {
  //here we enable any UI that was disabled during game play
  CUIScreenManager.enableUI();
  // Do any commonUI specific tasks and then call resume on gcm.
  if ("v4"==gcmVersion) {
    gcm_.resume();
  }
};

CUIScreenManager.reloadGameWindow = function() {
  if ("v4"==gcmVersion) {
    gcm_.reload();
  } else {
    parent.window.location.reload();
  }
};

CUIScreenManager.returnToLobby = function() {
  var lobbyUrl = UrlUtils.getUrlParams('lobbyurl');
  console.log(lobbyUrl);
  if(lobbyUrl !== null) {
    if ("v4"==gcmVersion) {
      gcm_.redirect(lobbyUrl);
    } else {
      CUIScreenManager.sendPostMessageToOperator({"gcmevent": "redirect","url": lobbyUrl});
      window.parent.location = lobbyUrl;
    }
  }

  ga('send', {
    hitType: 'event',
    eventCategory: 'COMMONUI',
    eventAction: 'RETURN_TO_LOBBY'
  });
};

CUIScreenManager.sendPostMessageToOperator=function(postMessage){
    /*
    window.parent - launcher
    window.parent.parent - Game
    Window.parent.parent.parent - Operator
    */
     window.parent.parent.parent.postMessage(postMessage,'*');
};

CUIScreenManager.redirect = function(url){
    if(url !== null) {
        if ("v4"==gcmVersion) {
            gcm_.redirect(url);
        } else {
            window.parent.location = url;
        }
    }

    ga('send', {
        hitType: 'event',
        eventCategory: 'COMMONUI',
        eventAction: 'REDIRECT_TO_URL'
    });
};

CUIScreenManager.disableProgressBar = function() {
  CUIScreenManager.progressBarEnabled = false;
  document.getElementById('loadingDisplayDiv').style.display = 'none';
};

CUIScreenManager.isProgressBarActive = function() {
  return CUIScreenManager.progressBarEnabled === true;
};

CUIScreenManager.openTransactionHistoryScreen = function() {
  var transactionHistoryUrl = UrlUtils.getUrlParams('realitycheck_uk_history');
  if (transactionHistoryUrl !== null && transactionHistoryUrl !== undefined && transactionHistoryUrl !== "") {
    window.open(transactionHistoryUrl, "_blank");
  } else {
    window.open("http://www.gamblingcommission.gov.uk", "_blank");
  }
};

CUIScreenManager.openGameInfo = function() {
  var gameName = UrlUtils.getUrlParams('gameName');
  var gameInfoUrl = "/static/help/" + gameName + "/" + CUITranslations.getLang() + "/" + gameName + ".html";
  console.log(gameInfoUrl);
  window.open(gameInfoUrl, "_blank");

  ga('send', {
    hitType: 'event',
    eventCategory: 'COMMONUI',
    eventAction: 'GAME_INFO'
  });
};

CUIScreenManager.goToGameDetails = function() {
  window.open(config.helpRoot + "/" + gcm_.urlutil.getUrlParams().gameName + "/en/" + gcm_.urlutil.getUrlParams().gameName + ".html");
};

CUIScreenManager.returnToHome = function() {
  if ("v4"==gcmVersion) {
    gcm_.redirect(config.siteRoot);
  } else {
    window.parent.location = config.siteRoot;
  }
};

CUIScreenManager.navigateToResponsibleGamingLink = function(){
  var responsibleGamingURL = UrlUtils.getUrlParams(CUIConstants.RESPONSIBLE_GAMING_URL);

  if(responsibleGamingURL){
    window.open(responsibleGamingURL);
  }

  ga('send', {
    hitType: 'event',
    eventCategory: 'COMMONUI',
    eventAction: 'RESPONSIBLE_GAME_LINK'
  });
};

CUIScreenManager.takeFullScreen = function() {
  CUIScreenManager.isFullScreenTaken = true;
  CUIScreenManager.requestIframeSize();
};

CUIScreenManager.releaseFullScreen = function() {
  CUIScreenManager.isFullScreenTaken = false;
  CUIScreenManager.requestIframeSize();
};

CUIScreenManager.requestIframeSize = function() {
  if(CUIScreenManager.gameLoadingScreen) {
    gcm_.commonUIResize('0%', '0%');
  } else {
    if(CUIScreenManager.isExpanded || CUIScreenManager.isFullScreenTaken){
      gcm_.commonUIResize('100%', '100%');
    } else {
        gcm_.commonUIResize(CUIScreenManager.COMMONUI_HEIGHT_TOGGLE, '100%', '0px' ,'0px');
    }
  }
};

CUIScreenManager.disableUI = function() {
  $(".c-hamburger").unbind("click");
};



CUIScreenManager.enableUI = function(callback) {
  $(".c-hamburger").unbind("click");
  $(".c-hamburger").click(function() {
    if ($(this).parents().find(".topbar-header").is(":hidden")) {
        CUIScreenManager.isExpanded = true;
        CUIScreenManager.requestIframeSize();
    } else {
        CUIScreenManager.isExpanded = false;
        // CUIScreenManager.requestIframeSize();
    }

    //TODO mutually exclusive?
    /*CUIGameSparks.toggleSlider();
    $(this).parents().find(".missionTab").slideToggle("200", function(){});
    $(this).parents().find(".missionsSummaryPlaque").slideToggle("200", function(){});*/

     var gsIframe=document.getElementById("gsIframe");

        if(gsIframe){
        CUIGameSparks=gsIframe.contentWindow.CUIGameSparks;
        CUIGameSparks.toggleSlider();
        }

    $(this).parents().find(".topbar-header").slideToggle("200", function(){
      if(!CUIScreenManager.isExpanded)
        CUIScreenManager.requestIframeSize();

      if(callback)
        callback();
    });
    $(this).find("a.info-toggle-float").toggleClass("icon-arrowdown icon-mainmenu");
    $(this).toggleClass('is-active');
  });
};

CUIScreenManager.minimizeTopbar = function () {
  if($(".c-hamburger").hasClass('is-active')) {
    $(".c-hamburger").click();
    // CUIScreenManager.isExpanded = false;
    // CUIScreenManager.requestIframeSize();
  }
};

CUIScreenManager.expandTopbar = function () {
  if(!$(".c-hamburger").hasClass('is-active')) {
    $(".c-hamburger").click();
    // CUIScreenManager.isExpanded = true;
    // CUIScreenManager.requestIframeSize();
  }
};

CUIScreenManager.layout = function() {
  var MINIMUM_RATIO = 1;
  var MAXIMUM_RATIO = 1;

  //this refers to the window that calls this function
  var ratio = Math.min(window.innerWidth / CUIScreenManager.DEFAULT_WIDTH, window.innerHeight / CUIScreenManager.DEFAULT_HEIGHT);
  ratio = Math.max(MINIMUM_RATIO, ratio);
  ratio = Math.min(MAXIMUM_RATIO, ratio);

  //resize iframe
  CUIScreenManager.COMMONUI_HEIGHT_EXPAND = CUIScreenManager.DEFAULT_COMMONUI_HEIGHT_EXPAND * ratio + 'px';
  CUIScreenManager.COMMONUI_HEIGHT_TOGGLE = CUIScreenManager.DEFAULT_COMMONUI_HEIGHT_TOGGLE * ratio + 'px';
  CUIScreenManager.requestIframeSize();
};

CUIScreenManager.handleIFrameClick = function(e){
  if(e.clientY > document.body.clientHeight){
    CUIScreenManager.minimizeTopbar();
  }
};
CUIScreenManager.acknowledgeRealityChecks = function(urlParamName, callback) {
  var url = UrlUtils.getUrlParams(urlParamName);
  if (url !== null && url !== undefined && url !== "") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4) {
        callback();
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  } else {
    callback();
  }
};

CUIScreenManager.acknowledgeRealityChecksWithUrl = function(url, callback) {
  if (url !== null && url !== undefined && url !== "") {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4) {
        callback();
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  } else {
    callback();
  }
};

CUIScreenManager.enableGameLoadingScreen = function() {
  CUIScreenManager.gameLoadingScreen = true;
  CUIScreenManager.useGameLoadingScreen();
};

CUIScreenManager.disableGameLoadingScreen = function() {
  CUIScreenManager.gameLoadingScreen = false;
  document.body.style.display = 'block';
  CUIScreenManager.requestIframeSize();
};

CUIScreenManager.useGameLoadingScreen = function() {
  document.body.style.display = 'none';
  CUIScreenManager.releaseFullScreen();
};

CUIScreenManager.isGameLoadingScreenEnabled = function() {
  return CUIScreenManager.gameLoadingScreen;
};

CUIScreenManager.initPageFunctions = function() {
};

CUIScreenManager.setupUIClock= function(){
    if(UrlUtils.getUrlParams(CUIConstants.ELAPSED_TIME)){
        var timer = new CUITimer();
        var elapsedTime = parseInt(UrlUtils.getUrlParams(CUIConstants.ELAPSED_TIME));
        timer.startTimer(elapsedTime);

        setInterval(function(){
            $(".tab-time").text(timer.getCurrentTime(false));
        }, 100);
    }else{
        var clock = new CUIClock();

        setInterval(function(){
            $(".tab-time").text(clock.getCurrentTime(false));
        },500);
    }
};

CUIScreenManager.showTopBarInfo = function(){
  $('#topBarContent').css('display', 'block');
  $('#fr-topBarContent').css('display', 'none');
  $('#fr-tab-currency').css('display', 'none');
  $('#fr-container').css('display', 'none');
};

CUIScreenManager.showFreeRoundsTopBarInfo = function(){
  $('#topBarContent').css('display', 'none');
  $('#fr-topBarContent').css('display', 'block');
  $('#fr-tab-currency').css('display', 'block');
  $('#fr-container').css('display', 'block');
};

CUIScreenManager.playerOption = function(option) {
  gcm_.gsPlayerAction(option);
  if(option == 'REJECT'){
    CUIScreenManager.minimizeTopbar();
  }
};

var CUIErrorHandling = {};

CUIErrorHandling.rcSessionStartTime = 0;

/*
 * The method sets the actual reality check start time by subtracting the
 * current time the current elapsed time of reality checks.
 * This is going to help us get the total time of play when the RC error is going to
 * come from the FOG server.
 */
CUIErrorHandling.setRCSessionStartTime = function() {
  var realityCheckUKElapsed = UrlUtils.getUrlParams('realitycheck_uk_elapsed');
	if (realityCheckUKElapsed) {
		var time = new Date();
		time.setSeconds(time.getSeconds() - realityCheckUKElapsed);
		CUIErrorHandling.rcSessionStartTime = time;
	}
};

CUIErrorHandling.getRCSessionDuration = function() {
	if (CUIErrorHandling.rcSessionStartTime === 0) {
		return 0;
	}
	var time = new Date();
	var duration = parseInt((time - CUIErrorHandling.rcSessionStartTime) / 1000);
	return duration;
};

/*
 * gcm will call handleError on the commonUI when an error needs to be displayed. This implementation handles the business logic
 * of client side error and always display all errors passed from GCM.
 *
 * The current error categories are:
 * { CRITICAL, INSUFFICIENT_FUNDS, LOGIN_ERROR, RECOVERABLE_ERROR, NON_RECOVERABLE_ERROR, CONNECTION_ERROR, MULTI_CHOICE_DIALOG, OTHER_GAME_IN_PROGRESS }
 */
CUIErrorHandling.handleError = function(errorCategory, errorSeverity, errorCode, errorMessage, errorParams, timeout) {
  var suppressMessage = false;
  var REALITY_CHECK_UK = "igf.games.realityCheck.RC_COOKIE_SESSION_EXPIRED";
  var REALITY_CHECK_MT = "igf.games.realityCheck.RC_SESSION_EXPIRED";

  if (errorParams !== null && errorParams!==undefined) {
    suppressMessage = errorParams.suppressMessage;
  }

  // Disable progress bar to display error incase the error message is received while showing game loading progress bar.
  if (CUIScreenManager.isProgressBarActive()) {
    CUIScreenManager.disableProgressBar();
    document.getElementById('topBarDiv').style.display = 'block';
  }

  //the colour and title of the error dialog depends on the errorSeverity
  var errorTitle, messageBoxStyle, errorOKCallback;
  errorTitle = CUITranslations.xl(errorSeverity);

  //available style: ERROR, INFO, WARNING
  switch (errorSeverity) {
    case 'ERROR':
      messageBoxStyle = commonUIDialogBox.STYLE.ERROR;
      break;
    case 'INFO':
      messageBoxStyle = commonUIDialogBox.STYLE.INFO;
      break;
    case 'WARNING':
      messageBoxStyle = commonUIDialogBox.STYLE.WARNING;
      break;
    default:
      messageBoxStyle = commonUIDialogBox.STYLE.ERROR;
  }
  
  //the iframe should expand to cover the whole screen with a transparency
  CUIScreenManager.takeFullScreen();

  //decide what to do after clicking ok in error dialog
  //business logic based on errorCategory
  switch (errorCategory) {
    case 'INSUFFICIENT_FUNDS':
      errorOKCallback = CUIErrorHandling.handleFundsErrorCallback;
      errorParams = {};
      errorParams.options = [CUITranslations.xl('CANCEL')];
      break;
    case 'CRITICAL':
      //cannot be resolved by refresh, return to lobby
      errorOKCallback = CUIScreenManager.returnToLobby;
      break;
    case 'LOGIN_ERROR':
      //for now we will just return to lobby
      errorOKCallback = CUIScreenManager.returnToLobby;
      break;
    case 'RECOVERABLE_ERROR':
      errorOKCallback = CUIErrorHandling.handleRecoverableErrorCallback;
      break;
    case 'NON_RECOVERABLE_ERROR':
      errorOKCallback = CUIScreenManager.returnToLobby;
      break;
    case 'CONNECTION_ERROR':
      errorOKCallback = CUIScreenManager.returnToLobby;
      break;
    case 'MULTI_CHOICE_DIALOG':
      errorOKCallback = CUIErrorHandling.handleRecoverableErrorCallback;
      break;
    case 'REALITY_CHECK':
      if (REALITY_CHECK_MT === errorCode) {
        errorTitle = errorParams.rcParams.title;
        errorMessage = errorParams.rcParams.text;
        if (errorParams.rcParams['0'] !== undefined) {
           errorParams.errorCode = "REALITY_CHECK_MT";
           errorParams.options = [errorParams.rcParams['0'],errorParams.rcParams['100']];
           errorOKCallback = CUIErrorHandling.handleMaltaRealityCheckErrorCallback;
         } else {
           errorParams.errorCode = "REALITY_CHECK_VF";
           errorCode = "REALITY_CHECK_VF";
           errorParams.options = [errorParams.rcParams['101'],errorParams.rcParams['102'],errorParams.rcParams['103']];
           errorOKCallback = function(playerChoice) { 
             CUIErrorHandling.handleVFRealityCheckErrorCallback(
               [errorParams.rcParams['101_action'],errorParams.rcParams['102_action'],errorParams.rcParams['103_action']],
               playerChoice); 
           };
         }
       } else {
         errorOKCallback = CUIErrorHandling.handleRealityCheckErrorCallback;
         errorTitle = CUITranslations.xl('INFORMATION');
         var realityCheckMsg = CUITranslations.xl('REALITY_CHECK');
         errorMessage = realityCheckMsg.replace('%s', parseInt(Math.round(CUIErrorHandling.getRCSessionDuration()/60)));
       }
       messageBoxStyle = commonUIDialogBox.STYLE.INFO;
       break;
    default:
      //default to reload the game window
      errorOKCallback = CUIScreenManager.reloadGameWindow;
      break;
  }

  //popup a model error dialog
  if (!suppressMessage) {
    if(errorCategory === 'INSUFFICIENT_FUNDS' || REALITY_CHECK_MT === errorCode ){
      commonUIDialogBox.show(errorTitle, errorMessage, messageBoxStyle, errorOKCallback, null, "MULTI_CHOICE_DIALOG", errorParams);
    } else {
      commonUIDialogBox.show(errorTitle, errorMessage, messageBoxStyle, errorOKCallback, null, errorCategory, errorParams);
    }
  } else {
    errorOKCallback();
  }
};

/*
 * reload the game window.
 */
CUIErrorHandling.reloadGameWindow = function() {
  if ("v4"==gcmVersion) {
    gcm_.reload();
  } else {
    parent.window.location.reload();
  }
};

/*
 * return to the lobby
 */
CUIErrorHandling.returnToLobby = function() {
  CUIScreenManager.returnToLobby();
};

/*
 * Handle UKGC reality check error callback
 * @param {String} playerChoice It will be one of {'ACCOUNT_HISTORY' or 'LOGOUT' or 'CONTINUE'}
 */
CUIErrorHandling.handleRealityCheckErrorCallback = function(playerChoice) {
  switch (playerChoice) {
    case 'ACCOUNT_HISTORY' :
      CUIScreenManager.openTransactionHistoryScreen();
      break;
    case 'LOBBY' :
      CUIScreenManager.acknowledgeRealityChecks('realitycheck_uk_exit', CUIScreenManager.returnToLobby);
      break;
    case 'CONTINUE' :
      CUIScreenManager.acknowledgeRealityChecks('realitycheck_uk_proceed', CUIErrorHandling.handleRecoverableErrorCallback);
      break;
    default: 
      CUIScreenManager.returnToLobby();  
      break;
  }
};

/*
 * Handle Malta reality check error callback
 * @param {String} playerChoice It will be one of {'ACCOUNT_HISTORY' or 'LOGOUT' or 'CONTINUE'}
 */
CUIErrorHandling.handleMaltaRealityCheckErrorCallback = function(playerChoice) {
  if (playerChoice === 0) {
    CUIErrorHandling.handleRecoverableErrorCallback();
  } else {
    CUIScreenManager.returnToLobby();
  }
};

CUIErrorHandling.handleVFRealityCheckErrorCallback = function(actions, playerChoice){
  switch (playerChoice) {
    case 0 :
      CUIScreenManager.acknowledgeRealityChecksWithUrl(actions[playerChoice], CUIErrorHandling.handleRecoverableErrorCallback);
      break;
    case 1 :
      CUIScreenManager.acknowledgeRealityChecksWithUrl(actions[playerChoice], CUIScreenManager.returnToLobby);
      break;
    case 2 :
      window.open(actions[playerChoice], "_blank");
      break;
    default: 
      CUIScreenManager.returnToLobby();  
      break;
  }
};


/*
 * @private
 * tell the game to resume
 * @param {number=} errorParamIndex of error Params passed for error category MULTI_CHOICE_DIALOG.
 */
CUIErrorHandling.resumeGame = function(errorParamIndex) {
  if(errorParamIndex !== null && errorParamIndex !== undefined ) {
    gcm_.resume(errorParamIndex);
  } else {
    gcm_.resume();
  }
};

/*
 * @private
 * this is the callback function for handleError()
 * @param {number=} errorParamIndex of error Params passed for error category MULTI_CHOICE_DIALOG.
 */
CUIErrorHandling.handleRecoverableErrorCallback = function(errorParamIndex) {
  CUIScreenManager.releaseFullScreen();
  CUIErrorHandling.resumeGame(errorParamIndex);
};

/*
 * this is the callback function for handleError()
 */
CUIErrorHandling.handleFundsErrorCallback = function (errorParamIndex) {
     CUIErrorHandling.handleRecoverableErrorCallback(0);
};

var CUIBalance = {};

CUIBalance.commonUIbalances = null;

/**
 * gcm will call this method to display the stake in the commonUI
 * @param {Object} stake a stake moneyInfo oject in the following format:
 *       {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'}.
 */
CUIBalance.stakeUpdate = function(stake) {
  document.getElementById('stake').innerHTML = stake.display;
  gameSparkElem.checkMinimumWager(stake)
};

/**
 * gcm will call this method to display the paid in the commonUI
 * @param {Object} paid a paid moneyInfo oject in the following format:
 *       {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'}.
 */
CUIBalance.paidUpdate = function(paid) {
  document.getElementById('paid').innerHTML = paid.display;
};

/**
 * gcm will call this method to display the balance in the commonUI
 * @param {Object} balances The new formatted balances value to object in the format:
 * <code>
 *   {
 *     'CASH': {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'},
 *     'BONUS': {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'},
 *     'FREEBET': {display: '£10.00', code:'GBP', value: 10.00 , currency_symbol: '£', ccy_thousand_separator: ',', ccy_decimal_separator: '.'}   
 *   }.
 * </code>
 */
CUIBalance.balancesUpdate = function(balances) {

  //grab the cash balance
  if(balances.CASH) {
    currencyFormat.init(",", ".", urlParams["currency"]);

    var totalBalance = balances.CASH.value;
    if (typeof balances.BONUS !== "undefined" && balances.BONUS.value !== null && balances.BONUS.value > 0) {
      totalBalance +=  balances.BONUS.value;
    }

    var totalBalanceFormatted = currencyFormat.format(totalBalance);

    document.getElementById('balance').innerHTML = totalBalanceFormatted.display; //balances.CASH.display;
  }

  //grab the bonus balance
  if(false && balances.BONUS) { // Disable Split Balances functionality OGS-1442
    // Make the bonusBalanceLabel and bonusBalance elements visible.
    document.getElementById('bonusBalanceLabel').removeAttribute("style");
    document.getElementById('bonusBalance').removeAttribute("style");

    document.getElementById('bonusBalance').innerHTML = balances.BONUS.display;
  }

  //store the balances
  commonUIbalances = balances;
};

var CUIFreeRounds = {};

  /**
   * GCM will call this when it needs the CommonUI to update it's FreeRounds information/state<br>
   * <br>
   * The CommonUI should use this information to do the following if STATUS is 'inprogress'<br>
   *    1. Display remaining FreeRounds, total accumulated win etc<br>
   * <br>
   * The CommonUI should use this information to do the following if STATUS is 'completed'<br>
   *    1. Display FreeRounds summary screen<br>
   *    2. Remove the remain FreeRounds, total accumulated win fields
   * <br><br>
   * Once the CommonUI has updated, it should call gcm.resume()
   *
   * @param {object} freeRoundsInfo An object representing the FreeRounds promotion. The format of
   * this object is defined by GCM - JSONSchema is available on request. An example is below.
   * <p>
   * {
   *   "CAMPAIGNID": "FW_10_SIGNUP",
   *   "ACTIVATIONID": "PROM_100002",
   *   "ENDDATE": "2016-11-08T12:00:00Z",
   *   "TOTALWIN": 31.1,
   *   "TOTALWIN_FMT": "£31.10",
   *   "CAMPAIGNVALUE": 100,
   *   "CAMPAIGNVALUE_FMT": "£100.00",
   *   "REJECTABLE": true,
   *   "STATUS": "inprogress",
   *   "OPTIONS": [
   *     {
   *       "BETLEVEL": 25,
   *       "BETLEVEL_FMT": "£25.00",
   *       "TOTALROUNDS": 4,
   *       "REMAININGROUNDS": 2,
   *       "FEATURE": ""
   *     }
   *   ]
   * }
   * <p>
   */
  CUIFreeRounds.handleFreeRoundsUpdate = function (freeRoundsInfo) {

    document.getElementById("frRemaining").textContent = freeRoundsInfo.OPTIONS[0].REMAININGROUNDS;
    document.getElementById("frWinnings").textContent = freeRoundsInfo.TOTALWIN_FMT;

    $("#fr-tab-currency").show();
    $("#fr-container").show();

    CUIFreeRounds.updateFreeRoundsContainer(freeRoundsInfo);

    if(freeRoundsInfo.STATUS === "completed"){
      CUIScreenManager.takeFullScreen();
      commonUIFRDialogBox.showFreeRoundsMessage(freeRoundsInfo, CUIFreeRounds.freeRoundsSummaryCallback);
    }else{
      gcm_.resume();
    }
  };

  CUIFreeRounds.freeRoundsSummaryCallback = function () {
    commonUIFRDialogBox.hideDialog();
    CUIScreenManager.releaseFullScreen();
    CUIScreenManager.showTopBarInfo();
    gcm_.resume();
  };

  /**
   * GCM will call this when it needs the CommonUI to display a new and available FreeRounds promotion
   * to the player. The CommonUI should display the FreeRounds options to the player and call gcm.resume(x)
   * function with the selected OPTIONS.BETLEVEL value as a parameter.<br>
   * <br>
   * The CommonUI should expect between 1 and 4 OPTION elements<br>
   * <br>
   * The CommonUI should return 0 if the player decides to reject the promotion
   *
   * @param {object} freeRoundsInfo An object representing the FreeRounds promotion. The format of
   * this object is defined by GCM - JSONSchema is available on request. An example is below.
   * <p>
   * {
   *   "CAMPAIGNID": "FW_10_SIGNUP",
   *   "ACTIVATIONID": "PROM_100002",
   *   "ENDDATE": "2016-11-08T12:00:00Z",
   *   "TOTALWIN": 0,
   *   "TOTALWIN_FMT": "£0.00",
   *   "CAMPAIGNVALUE": 100,
   *   "CAMPAIGNVALUE_FMT": "£100.00",
   *   "REJECTABLE": true,
   *   "STATUS": "notstarted",
   *   "OPTIONS": [
   *     {
   *       "BETLEVEL": 25,
   *       "BETLEVEL_FMT": "£25.00",
   *       "TOTALROUNDS": 4,
   *       "REMAININGROUNDS": 4,
   *       "FEATURE": ""
   *     },
   *     {
   *       "BETLEVEL": 2.5,
   *       "BETLEVEL_FMT": "£2.50",
   *       "TOTALROUNDS": 40,
   *       "REMAININGROUNDS": 40,
   *       "FEATURE": ""
   *     }
   *   ]
   * }
   * <p>
   */
  CUIFreeRounds.handleFreeRoundsAward = function (freeRoundsInfo) {
    CUIScreenManager.takeFullScreen();
    commonUIFRDialogBox.showFreeRoundsMessage(freeRoundsInfo, CUIFreeRounds.freeRoundsOptionsCallback);
  };

  CUIFreeRounds.freeRoundsOptionsCallback = function (betLevel) {
    if(betLevel && betLevel > 0) {
      CUIScreenManager.showFreeRoundsTopBarInfo();
    }
    commonUIFRDialogBox.hideDialog();
    CUIScreenManager.releaseFullScreen();
    gcm_.resume(betLevel);
  };

  CUIFreeRounds.freeRoundsInProgressCallback = function () {
    commonUIFRDialogBox.hideDialog();
    CUIScreenManager.showFreeRoundsTopBarInfo();
    CUIScreenManager.releaseFullScreen();
    gcm_.resume();
  };

  /**
   * GCM will call this when it needs the CommonUI to display to the player that they are about to
   * resume an inprogress FreeRounds promotion. Once the CommonUI has shown this message it should
   * call gcm.resume()
   *
   * @param {object} freeRoundsInfo An object representing the FreeRounds promotion. The format of
   * this object is defined by GCM - JSONSchema is available on request. An example is below.
   * <p>
   * {
   *   "CAMPAIGNID": "FW_10_SIGNUP",
   *   "ACTIVATIONID": "PROM_100002",
   *   "ENDDATE": "2016-11-08T12:00:00Z",
   *   "TOTALWIN": 5.22,
   *   "TOTALWIN_FMT": "£5.22",
   *   "CAMPAIGNVALUE": 100,
   *   "CAMPAIGNVALUE_FMT": "£100.00",
   *   "REJECTABLE": true,
   *   "STATUS": "inprogress"
   *   "OPTIONS": [
   *     {
   *       "BETLEVEL": 25,
   *       "BETLEVEL_FMT": "£25.00",
   *       "TOTALROUNDS": 4,
   *       "REMAININGROUNDS": 2,
   *       "FEATURE": ""
   *     }
   *   ]
   * }
   * <p>
   */
  CUIFreeRounds.handleFreeRoundsInProgress = function (freeRoundsInfo) {

    CUIScreenManager.takeFullScreen();
    commonUIFRDialogBox.showFreeRoundsMessage(freeRoundsInfo, CUIFreeRounds.freeRoundsInProgressCallback);
    CUIScreenManager.showFreeRoundsTopBarInfo();

    CUIFreeRounds.updateFreeRoundsContainer(freeRoundsInfo);
  };

    /* This method is used to display the number of free spins and win values */
    CUIFreeRounds.updateFreeRoundsContainer=function(updateInfo){

        var frText = (updateInfo.OPTIONS[0].REMAININGROUNDS === 1)? "Free Round" : "Free Rounds";

        if(document.getElementById('fr-remaining-rounds') != null)
             document.getElementById("fr-remaining-rounds").textContent = updateInfo.OPTIONS[0].REMAININGROUNDS;

         $("#top-tab").addClass("fr-tab-container");

        var fr_tab_text          =  document.getElementById("fr-tab-text");
        var fr_tab_currency_code =  document.getElementById("fr-tab-currency-code");


         if(fr_tab_text != null)
         {
           if((updateInfo.OPTIONS[0].TOTALROUNDS-updateInfo.OPTIONS[0].REMAININGROUNDS) === 0){
               fr_tab_text.style.color              =   "#fadf00";
               fr_tab_text.textContent              =   frText;
               fr_tab_currency_code.style.display   =   "none";

           }
           else{
               fr_tab_text.style.color              =   "#86ed82";
               fr_tab_currency_code.style.display   =   "block";
               if(currencyFormat.format(updateInfo.TOTALWIN).code==null){
                    currencyFormat.init(",",".",urlParams.currency)
               }
               var cur_currency                     =   currencyFormat.format(updateInfo.TOTALWIN);
               var total_win                        =   updateInfo.TOTALWIN_FMT.replace(cur_currency.currency_symbol,'');
               fr_tab_text.textContent              =   total_win;
               fr_tab_currency_code.textContent     =   cur_currency.code;
               CUIFreeRounds.adjustFontSize();
           }
         }
    }

    /* This method is used to adjust the font size dynamically based on win amount */
     CUIFreeRounds.adjustFontSize=function(){
        var font_size         =  $('#fr-tab-text').css('font-size');
        var tab_text          =  document.getElementById("fr-tab-text");
        var tab_currency      =  document.getElementById("fr-tab-currency");

        if(font_size != '' && font_size != null && font_size != undefined)
           font_size     = parseInt(font_size.replace('px',''));

        var container_width = 0; var text_width = 0;
        var adjust_size = font_size;
         if(font_size>0){
            for(var i=0;i<font_size;i++){
                 container_width    =   parseInt(tab_currency.clientWidth);
                 text_width         =   parseInt(tab_text.scrollWidth);
                 if(container_width<text_width){
                     tab_text.style.fontSize = (--adjust_size)+'px';
                 }
                 else{
                     break;
                 }
            }
         }
     }

window.addEventListener("resize", CUIFreeRounds.adjustFontSize);


var CUIMessages = {};
  /**
   * GCM will call this when it needs the CommonUI to display to the player a CMA or a Reality Check message.
   * Once the CommonUI has shown this message it should call gcm.resume().
   *
   * @param {object} message An object representing the Message. The format of
   * this object is defined by GCM - JSONSchema is available on request. An example is below.
   * <p>
   * {
   *   ID : 101,
   *   TITLE : 'Message Title',
   *   TEXT : 'New message',
   *   OPTIONS : [{
   *      ID : 0,
   *      ACTION : 'https://cb.oper.com/B4711?sid=34754',
   *      BODY : 'OK'
   *     },
   *     {
   *      ID : 103,
   *      ACTION : 'https://www.oper.com/B4711',
   *      BODY : 'Bonus Details'
   *     }
   *   ]
   *  }
   * <p>
   */
  CUIMessages.handleMessageTrigger = function(message) {
    CUIScreenManager.takeFullScreen();
    if (typeof message !== 'undefined' &&  typeof message.ID !== 'undefined') {
      switch (message.ID) {
        case 100: // Reality Check Message
          commonUIMessageDialogBox.show(message.TITLE, message.TEXT, message.OPTIONS, 'RC', CUIMessages.handleMessageTriggerCallback);
          break;
        case 101: // CMA Check Message
          commonUIMessageDialogBox.show(message.TITLE, message.TEXT, message.OPTIONS, 'CMA', CUIMessages.handleMessageTriggerCallback);
          break;
      }

    }
  };

  /**
   * Message Trigger Callback, it is called to return to game after a successful user interaction
   * with the message dialog.
   */
  CUIMessages.handleMessageTriggerCallback = function() {
    commonUIMessageDialogBox.hideDialog();
    CUIScreenManager.showTopBarInfo();
    CUIScreenManager.releaseFullScreen();
    gcm_.resume();
  };
var MGSCommonUI = (
  function commonUI() {
    var progressBar_ = new progressBarView();
    var CCY_FORMATTER_URL = GCMConfig.ccyFormatterUrl;

    function loadProgressUpdate(percentLoaded) {
      if (CUIScreenManager.isProgressBarActive()) {
        progressBar_.loadProgressUpdate(percentLoaded);
      }
    }

    //we must initialize gcm as one of the first things we do
    //pass in gameWindow, commonUIWindow and the base url for the web services
    function init() {
      // Only GCM v4 games will have commonUI url loaded with parameter gcmVersion=v4
      // Default GCM version is v3
      if (getUrlParam('gcmVersion')) {
        gcmVersion = getUrlParam('gcmVersion');
      }

      if ("v3"==gcmVersion) {
        gcm_ = com.openbet.gcm;
        //disable commonUI topbar while game is loading
        CUIScreenManager.disableUI();
        renderCUIParams();
        gcm_.init(window.parent, window, config.gcmWsBase);

        sendReady();
      }
    }

    // called from GCMAdapter (i.e. v4.0 only)
    function initGCMV4(gcmRef, cuiParams) {

      gcmVersion = "v4";
      gcm_ = gcmRef;
      urlParams = cuiParams;
      gcm_.registerService("CCY_FORMAT", CCY_FORMATTER_URL, [",", ".",urlParams["currency"]]);

      //disable commonUI topbar while game is loading
      CUIScreenManager.disableUI();
      renderCUIParams();

      if(urlParams["cuiPosition"]) {
        alignCUIToggleBar();
      }

      CUIScreenManager.setupUIClock();
      sendReady();
    }

    function renderCUIParams() {
      if("v4" == gcmVersion) {
        document.getElementById('settingsGameInfoOption').style.display = 'none';
        document.getElementById('settingsHelpOption').style.display = 'none';
        document.getElementById('fr-settingsGameInfoOption').style.display = 'none';
        document.getElementById('fr-settingsHelpOption').style.display = 'none';
      } else {
        document.getElementById('settingsHelpOption').style.display = 'none';
        document.getElementById('fr-settingsHelpOption').style.display = 'none';
      }

      CUITranslations.setLang(UrlUtils.getUrlParams('lang').substring(0,2));
      CUITranslations.setOperatorId(UrlUtils.getUrlParams('operatorId'));
      CUITranslations.setUri(GCMConfig.translationUrl);
      document.getElementById("balanceLabel").textContent = CUITranslations.xl('BALANCE');
      document.getElementById("bonusBalanceLabel").textContent = CUITranslations.xl('BONUS');
      document.getElementById("stakeLabel").textContent = CUITranslations.xl('STAKE');
      document.getElementById("paidLabel").textContent = CUITranslations.xl('WIN');

      if(!UrlUtils.getUrlParams(CUIConstants.RESPONSIBLE_GAMING_URL)) {
          document.getElementById('settingResponsibleGaming').style.display = 'none';
          document.getElementById('fr-settingResponsibleGaming').style.display = 'none';
      }

      //FreeRounds bar 
      document.getElementById("frRemainingLabel").textContent = "FREE ROUNDS REMAINING";
      document.getElementById("frWinningsLabel").textContent = "FREE ROUNDS WINNINGS";

      var gameStr = UrlUtils.getUrlParams('gameName');
      var loadingDisplayDiv = document.getElementById('loadingDisplayDiv');
      loadingDisplayDiv.innerHTML = progressBar_.progressBarHTML(gameStr);
    }

    /**
     * MGS mobile commonUI always align the commonUI toggle bar to the centre of the screen.
     * For NextGen games integrated via GCMV4, having the toggle bar at centre hides some of the game
     * UI elements like the player's stake values. So in order to solve this, GCM now checks if game has a preference(left/right/centre) for
     * position of toggle bar and if so, GCM informs commonUI regarding the same and commonUI can use
     * this information to determine the appropriate area of topbar to show the toggle bar button.
     */
    function alignCUIToggleBar() {
      var toggleBar = document.getElementById("top-tab");
      toggleBar.style.position= "absolute";

      if("left" == urlParams["cuiPosition"]) {
          toggleBar.style.left = "0";
      } else if ("right" == urlParams["cuiPosition"]) {
          toggleBar.style.right = "0";
      } else {
        // Possible values for CUI toggle button position are : left, right, centre.
        // MGS CUI by default aligns to "centre".
        // So when value of "cuiPosition" is not "left" or "right", we just need to revert to default value.
        toggleBar.style.position= "relative";
      }
    }

    /**
     * gcm will call this method when the game is loaded and ready to be shown.
     */
    function gameReady() {
      // show minimized topbar
      document.getElementById('loadingDisplayDiv').style.display = 'none';
      document.getElementById('topBarDiv').style.display = 'block';
      CUIScreenManager.disableProgressBar();
      document.getElementById('tab').style.display = 'block';
      //enable commonUI topbar once game is ready
      CUIScreenManager.enableUI(); 

      if(!commonUIDialogBox.isDisplaying()) {
        CUIScreenManager.releaseFullScreen();
      }

      if(CUIScreenManager.isGameLoadingScreenEnabled()) {
        CUIScreenManager.disableGameLoadingScreen();
      }

      gcm_.gameRevealed();
      
      document.body.style.backgroundColor = 'transparent';
      document.body.style.margin = '0px';
        
      //resize commonui when window size changes
      CUIScreenManager.requestIframeSize();

      CUIErrorHandling.setRCSessionStartTime();

      $(document).click(CUIScreenManager.handleIFrameClick);
      // tell gcm that we can be shrunk back down to 'minimized topbar' size
      CUIScreenManager.minimizeTopbar();

      window.onresize = CUIScreenManager.requestIframeSize;
    }

    /**
     * gcm will call this method when the game config has been loaded
     */
    function configReady(loggedIn) { }
    
  /*
   * tell the game to resume
   * @param {number=} errorParamIndex of error Params passed for error category MULTI_CHOICE_DIALOG.
   */
  function resumeGame(errorParamIndex) {
    if(errorParamIndex !== null && errorParamIndex !== undefined) {
      gcm_.resume(errorParamIndex);
    } else {
      gcm_.resume();
    }
  }

  /*
   * @private
   * inform gcm we are ready
   */
  function sendReady() {
    gcm_.commonUIReady(commonUIForGcm_);

    // initially layout commonUI, using device window size
    CUIScreenManager.layout();
    // initially ask for the full screen from gcm
    // 100% height
    CUIScreenManager.takeFullScreen();
  }

  function buildLoadingScreen(){
    var gameStr = UrlUtils.getUrlParams('gameName');

    var loadingDisplayDiv = document.getElementById('loadingScreenGameName');
    loadingDisplayDiv.innerHTML = gameStr;
  }

  // the public interface for the commonUI which it must expose to gcm
  var commonUIForGcm_ = {
    'stakeUpdate': CUIBalance.stakeUpdate,
    'paidUpdate': CUIBalance.paidUpdate,
    'balancesUpdate': CUIBalance.balancesUpdate,
    'gameAnimationStart': CUIScreenManager.gameAnimationStart,
    'gameAnimationComplete': CUIScreenManager.gameAnimationComplete,
    'gameReady': gameReady,
    'loadProgressUpdate': loadProgressUpdate,
    'regOption': CUIOptions.regOption,
    'optionHasChanged': CUIOptions.optionHasChanged,
    'configReady': configReady,
    'handleError': CUIErrorHandling.handleError,
    'handleSessionStats': function(){},
    'handleFreebetAward': function(){},
    'handleBonusBarFilled': function(){},
    'handleBonusBarUpdate': function(){},
    'handleSessionDurationUpdate': function(){},
    'handleFreeRoundsAward' : CUIFreeRounds.handleFreeRoundsAward,
    'handleFreeRoundsInProgress' : CUIFreeRounds.handleFreeRoundsInProgress,
    'handleFreeRoundsUpdate' : CUIFreeRounds.handleFreeRoundsUpdate,
    'gameResized': function(){},
    'gameHasLoadingScreen': CUIScreenManager.enableGameLoadingScreen,
    'handleMessageTrigger': CUIMessages.handleMessageTrigger,
    'handleGSTrigger': gameSparkElem.createMissionUI,
    'showSyndicateJackpotWinAward': liveServElem.showUI,
    'showSyndicateJackpotProgressBar': CUIJackpotNotificationsMessages.launch,
    'disposeSyndicateJackpotProgressBar': CUIJackpotNotificationsMessages.hide
  };

  //public interface for commonUI html components
  return {
    'initGCMV4': initGCMV4,
    'init': init,
    'toggleTopbar': CUIScreenManager.toggleTopbar,
    'toggleMute': CUIOptions.toggleMute,
    'toggleTurbo': CUIOptions.toggleTurbo,
    'togglePaytable': CUIOptions.togglePaytable,
    'displayLoginDiv': function(){},
    'handleError': CUIErrorHandling.handleError,
    'handleSessionStats': function(){},
    'handleFreebetAward': function(){},
    'handleBonusBarFilled': function(){},
    'handleBonusBarUpdate': function(){},
    'handleSessionDurationUpdate': function(){}
  };
}());

var CUITranslations = {};

CUITranslations.DEFAULT_OPERATOR_ID = "0";
CUITranslations.operatorId = null;
CUITranslations.lang = null;
CUITranslations.uri = null;

CUITranslations.loadTranslations = function (operatorId) {
    // load operator specific translation
    if (operatorId !== 0 && !CUITranslations.translations[operatorId]) {
        CUITranslations.translations[operatorId] = CUITranslations.loadTranslationByFileName(operatorId + ".json");
    }
}

CUITranslations.loadTranslationByFileName = function (fileName) {
    return CUITranslations.loadJson(CUITranslations.getUri() + fileName);
}

CUITranslations.loadJson = function (url) {
    var req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.overrideMimeType("application/json");
    req.send();
    if (req.status === 200) {
        return JSON.parse(req.responseText);
    } else if (req.status === 403 || req.status === 404) {
        return {};
    }
}

CUITranslations.setUri = function (uri) {
    CUITranslations.uri = uri;
};

CUITranslations.getUri = function () {
    return CUITranslations.uri;
};

CUITranslations.setLang = function (lang) {
    CUITranslations.lang = lang;
};

CUITranslations.getLang = function () {
    var lang = CUITranslations.lang;
    //OGS-2972: Translations are broken
    var operatorId=CUITranslations.getOperatorId();
    if(lang && CUITranslations.translations[operatorId] && CUITranslations.translations[operatorId][lang]){
    operatorId=CUITranslations.getOperatorId();
    }
    else{
    operatorId=CUITranslations.DEFAULT_OPERATOR_ID;
    }
//OGS-426: if lang is empty OR is not empty but not supported then return "en"
    if (!lang || !CUITranslations.translations[operatorId][lang]) {
        CUITranslations.setLang('en');
        return 'en';
    }
    return lang;
};

CUITranslations.setOperatorId = function (operatorId) {
    CUITranslations.operatorId = operatorId;
};

CUITranslations.getOperatorId = function () {
    var operatorId = CUITranslations.operatorId;
    if (!operatorId) {
        CUITranslations.setOperatorId(CUITranslations.DEFAULT_OPERATOR_ID);
        return CUITranslations.operatorId;
    }
    return operatorId;
};

CUITranslations.xl = function (label) {
    var operatorId = CUITranslations.getOperatorId();
    CUITranslations.loadTranslations(operatorId);
    var lang = CUITranslations.getLang();

    var text;
    if (operatorId !== CUITranslations.DEFAULT_OPERATOR_ID && CUITranslations.exist(operatorId, lang, label)) {
        text = CUITranslations.translations[operatorId][lang][label];
    } else if (CUITranslations.exist(CUITranslations.DEFAULT_OPERATOR_ID, lang, label)) {
        text = CUITranslations.translations[CUITranslations.DEFAULT_OPERATOR_ID][lang][label];
    } else if (CUITranslations.exist(CUITranslations.DEFAULT_OPERATOR_ID, "en", label)) {
        text = CUITranslations.translations[CUITranslations.DEFAULT_OPERATOR_ID]["en"][label];
    } else {
        text = label;
    }
    return text;
};

CUITranslations.exist = function (operatorId, lang, label) {
    return Boolean(CUITranslations.translations[operatorId]
        && CUITranslations.translations[operatorId][lang]
        && CUITranslations.translations[operatorId][lang][label]);
};

CUITranslations.translations = {
    "0": {
        "en": {
            "BALANCE": "Balance",
            "BONUS": "Bonus",
            "WIN": "Win",
            "LOBBY": "Lobby",
            "CONTINUE": "Continue",
            "ACCOUNT_HISTORY": "Account History",
            "REALITY_CHECK": "You have been playing for %s minutes, do you want to continue?",
            "STAKE": "Stake",
            "INFORMATION": "Information",
            "CANCEL": "Cancel",
            "EXIT_GAME": "Exit game",
            "OK": "OK",
            "QUIT": "Quit",
            "GAME_LAUNCH_ERROR": "Game Launch Error",
            "ERROR": "ERROR",
            "INFO": "INFO",
            "WARNING": "WARNING",
            "SJ_MSG0": "CONGRATULATIONS",
            "SJ_MSG1": "YOU HAVE SUCCESSFULLY WON A SHARE OF A SYNDICATE JACKPOT PAYOUT.",
            "SJ_MSG2": "The amount you have been credited with is",
            "SJ_MSG3": "As a member of",
            "SJ_MSG4": "you contributed",
            "SJ_MSG5": "towards the main Jackpot Pool during the qualifying period.",
            "SJ_MSG6": "This equates to",
            "SJ_MSG7": "towards the total contributions made by all fellow syndicate players during the same period.",
            "SJ_MSG8": "The total Jackpot Prize Pool shared between all players is",
            "SJ_MSG9": "You have triggered a Syndicate Jackpot!",
            "SJ_MSG10": "Your winnings are being calculated.",
            "SJ_MSG11": "Please wait...",
            "SJ_MSG12": "STILL CALCULATING",
            "SJ_MSG13": "We Thank You for your continued patience.",
            "GS_TERMS_CONDITIONS": "TERMS AND CONDITIONS",
            "GS_CLICK_CONTINUE": "CLICK TO CONTINUE",
            "GS_MIN_WAGER": "MIN. WAGER"
        },
        "da": {
            "BALANCE": "Saldo",
            "BONUS": "Bonus",
            "WIN": "Gevinst",
            "LOBBY": "Lobby",
            "CONTINUE": "Fortsæt",
            "ACCOUNT_HISTORY": "Kontohistorik",
            "REALITY_CHECK": "Du har spillet i %s minutter, vil du fortsætte?",
            "STAKE": "Indsats",
            "INFORMATION": "Information",
            "CANCEL": "Annuller",
            "EXIT_GAME": "Afslut spil",
            "OK": "OK",
            "QUIT": "Afslut",
            "GAME_LAUNCH_ERROR": "Fejl i spilopstart",
            "ERROR": "FEJL",
            "INFO": "INFO",
            "WARNING": "ADVARSEL",
        },
        "de": {
            "BALANCE": "Guthaben",
            "BONUS": "Bonus",
            "WIN": "Gewinn",
            "LOBBY": "Lobby",
            "CONTINUE": "Weiter",
            "ACCOUNT_HISTORY": "Kontoverlauf",
            "REALITY_CHECK": "Sie spielen seit %s Minuten, möchten Sie fortfahren?",
            "STAKE": "Einsatz",
            "INFORMATION": "Informationen",
            "CANCEL": "Abbrechen",
            "EXIT_GAME": "Spiel beenden",
            "OK": "OK",
            "QUIT": "Beenden",
            "GAME_LAUNCH_ERROR": "Fehler beim Spielstart",
            "ERROR": "FEHLER",
            "INFO": "INFO",
            "WARNING": "WARNUNG",
            "SJ_MSG0": "GLÜCKWUNSCH",
            "SJ_MSG1": "SIE HABEN EINEN ANTEIL AN DER AUSZAHLUNG EINES GEMEINSCHAFTS-JACKPOTS GEWONNEN.",
            "SJ_MSG2": "Folgender Betrag wurde Ihnen gutgeschrieben:",
            "SJ_MSG3": "Als Mitglied von",
            "SJ_MSG4": "haben Sie in der Qualifizierungsphase",
            "SJ_MSG5": "zum gemeinsamen Haupt-Jackpot beigetragen.",
            "SJ_MSG6": "Das entspricht",
            "SJ_MSG7": "der gesamten Beiträge, die Ihre Mitspieler in der Gemeinschaft während dieser Phase beigesteuert haben.",
            "SJ_MSG8": "Der Gesamt-Jackpot, der zwischen allen Spielern aufgeteilt wird, beträgt",
            "SJ_MSG9": "Sie haben einen Gemeinschafts-Jackpot ausgelöst!",
            "SJ_MSG10": "Ihre Gewinne werden berechnet.",
            "SJ_MSG11": "Bitte warten Sie...",
            "SJ_MSG12": "DIE BERECHNUNG LÄUFT",
            "SJ_MSG13": "Vielen Dank für Ihre Geduld.",
            "GS_TERMS_CONDITIONS": "ALLGEMEINE GESCHÄFTSBEDINGUNGEN",
            "GS_CLICK_CONTINUE": "KLICKEN, UM FORTZUFAHREN",
            "GS_MIN_WAGER": "MIN.-EINSATZ"
        },
        "es": {
            "BALANCE": "Saldo",
            "BONUS": "Bonus",
            "WIN": "Premio",
            "LOBBY": "Lobby",
            "CONTINUE": "Continuar",
            "ACCOUNT_HISTORY": "Historial de cuenta",
            "REALITY_CHECK": "Lleva jugando %s minutos, ¿quiere continuar?",
            "STAKE": "Apuesta",
            "INFORMATION": "Información",
            "CANCEL": "Cancelar",
            "EXIT_GAME": "Salir del juego",
            "OK": "Aceptar",
            "QUIT": "Salir",
            "GAME_LAUNCH_ERROR": "Error al iniciar el juego",
            "ERROR": "ERROR",
            "INFO": "INFORMACIÓN",
            "WARNING": "ADVERTENCIA",
        },
        "fi": {
            "BALANCE": "Saldo",
            "BONUS": "Bonus",
            "WIN": "Voitto",
            "LOBBY": "Aula",
            "CONTINUE": "Jatka",
            "ACCOUNT_HISTORY": "Tilihistoria",
            "REALITY_CHECK": "Olet pelannut %s minuuttia, haluatko jatkaa?",
            "STAKE": "Panos",
            "INFORMATION": "Tietoa",
            "CANCEL": "Peruuta",
            "EXIT_GAME": "Sulje peli",
            "OK": "OK",
            "QUIT": "Lopeta",
            "GAME_LAUNCH_ERROR": "Pelin avaamisessa tapahtui virhe",
            "ERROR": "VIRHE",
            "INFO": "INFO",
            "WARNING": "VAROITUS",
            "SJ_MSG0": "ONNITTELUT",
            "SJ_MSG1": "OLET VOITTANUT OSUUDEN RYHMITTYMÄJÄTTIPOTIN VOITOSTA.",
            "SJ_MSG2": "Voittosummasi on",
            "SJ_MSG3": "Ryhmittymän",
            "SJ_MSG4": "jäsenenä kasvatit karsintajakson aikana pääjättipottia summalla",
            "SJ_MSG5": " ",
            "SJ_MSG6": "Tämä vastaa",
            "SJ_MSG7": "osuutta kaikkien ryhmittymän jäsenten yhteensä tällä jaksolla keräämästä summasta.",
            "SJ_MSG8": "Kaikkien pelaajien jakaman yhteisjättipotin summa on",
            "SJ_MSG9": "Olet aktivoinut ryhmittymäjättipotin!",
            "SJ_MSG10": "Voittojasi lasketaan.",
            "SJ_MSG11": "Odota...",
            "SJ_MSG12": "LASKETAAN EDELLEEN",
            "SJ_MSG13": "kiitos kärsivällisyydestäsi.",
            "GS_TERMS_CONDITIONS": "KÄYTTÖEHDOT",
            "GS_CLICK_CONTINUE": "JATKA KLIKKAAMALLA",
            "GS_MIN_WAGER": "VÄH.PANOS"
        },
        "fr": {
            "BALANCE": "Solde",
            "BONUS": "Bonus",
            "WIN": "Gain",
            "LOBBY": "Lobby",
            "CONTINUE": "Continuer",
            "ACCOUNT_HISTORY": "Historique du compte",
            "REALITY_CHECK": "Vous jouez depuis %s minutes, souhaitez-vous continuer ?",
            "STAKE": "Mise",
            "INFORMATION": "Information",
            "CANCEL": "Annuler",
            "EXIT_GAME": "Quitter le jeu",
            "OK": "OK",
            "QUIT": "Arrêter",
            "GAME_LAUNCH_ERROR": "Erreur lancement du jeu",
            "ERROR": "ERREUR",
            "INFO": "INFO",
            "WARNING": "AVERTISSEMENT",
        },
        "it": {
            "BALANCE": "Saldo",
            "BONUS": "Bonus",
            "WIN": "Vincita",
            "LOBBY": "Lobby",
            "CONTINUE": "Continua",
            "ACCOUNT_HISTORY": "Cronologia conto",
            "REALITY_CHECK": "Stai giocando da %s minuti, vuoi continuare?",
            "STAKE": "Puntata",
            "INFORMATION": "Informazioni",
            "CANCEL": "Annulla",
            "EXIT_GAME": "Esci dal gioco",
            "OK": "OK",
            "QUIT": "Chiudi",
            "GAME_LAUNCH_ERROR": "Errore Caricamento Gioco",
            "ERROR": "ERRORE",
            "INFO": "INFO",
            "WARNING": "ATTENZIONE",
        },
        "nl": {
            "BALANCE": "Saldo",
            "BONUS": "Bonus",
            "WIN": "Winst",
            "LOBBY": "Lobby",
            "CONTINUE": "Doorgaan",
            "ACCOUNT_HISTORY": "Accountgeschiedenis",
            "REALITY_CHECK": "U heeft %s minuten gespeeld. Wilt u doorgaan?",
            "STAKE": "Inzet",
            "INFORMATION": "Informatie",
            "CANCEL": "Annuleren",
            "EXIT_GAME": "Spel afsluiten",
            "OK": "OK",
            "QUIT": "Afsluiten",
            "GAME_LAUNCH_ERROR": "Fout bij lanceren spel",
            "ERROR": "FOUT",
            "INFO": "INFO",
            "WARNING": "WAARSCHUWING",
        },
        "no": {
            "BALANCE": "Saldo",
            "BONUS": "Bonus",
            "WIN": "Gevinst",
            "LOBBY": "Lobby",
            "CONTINUE": "Fortsette",
            "ACCOUNT_HISTORY": "Kontohistorikk",
            "REALITY_CHECK": "Du har spilt i %s minutter, ønsker du å fortsette?",
            "STAKE": "Innsats",
            "INFORMATION": "Opplysninger",
            "CANCEL": "Avbryt",
            "EXIT_GAME": "Lukk spill",
            "OK": "OK",
            "QUIT": "Avslutt",
            "GAME_LAUNCH_ERROR": "Feil ved spilloppstart",
            "ERROR": "FEIL",
            "INFO": "INFO",
            "WARNING": "ADVARSEL",
            "SJ_MSG0": "GRATULERER",
            "SJ_MSG1": "DU HAR VUNNET EN ANDEL AV EN SYNDICATE-JACKPOTTUTBETALING.",
            "SJ_MSG2": "Beløpet du har blitt tildelt, er",
            "SJ_MSG3": "Som medlem av",
            "SJ_MSG4": "bidro du med",
            "SJ_MSG5": "til hovedjackpotpotten i løpet av kvalifiseringsperioden.",
            "SJ_MSG6": "Dette tilsvarer",
            "SJ_MSG7": "av alle bidrag som er gjort av syndicate-medspillere i løpet av samme periode.",
            "SJ_MSG8": "Den totale jackpotpremiepotten som deles mellom alle spillere, er ",
            "SJ_MSG9": "du har utløst en syndicate-jackpot!",
            "SJ_MSG10": "Gevinstene dine beregnes.",
            "SJ_MSG11": "Vent litt...",
            "SJ_MSG12": "BEREGNER FORTSATT",
            "SJ_MSG13": "Takk for tålmodigheten.",
            "GS_TERMS_CONDITIONS": "VILKÅR OG BETINGELSER",
            "GS_CLICK_CONTINUE": "KLIKK HER FOR Å FORTSETTE",
            "GS_MIN_WAGER": "MIN. INNSATS"
        },
        "sv": {
            "BALANCE": "Saldo",
            "BONUS": "Bonus",
            "WIN": "Vinst",
            "LOBBY": "Lobby",
            "CONTINUE": "Fortsätt",
            "ACCOUNT_HISTORY": "Kontohistorik",
            "REALITY_CHECK": "Du har spelat i %s minuter, vill du fortsätta?",
            "STAKE": "Insats",
            "INFORMATION": "Information",
            "CANCEL": "Avbryt",
            "EXIT_GAME": "Avsluta spel",
            "OK": "OK",
            "QUIT": "Avsluta",
            "GAME_LAUNCH_ERROR": "Fel vid spelstart",
            "ERROR": "FEL",
            "INFO": "INFO",
            "WARNING": "VARNING",
        },
        "tr": {
            "BALANCE": "Bakiye",
            "BONUS": "Bonus",
            "WIN": "Kazanç",
            "LOBBY": "Lobi",
            "CONTINUE": "Devam",
            "ACCOUNT_HISTORY": "Hesap Geçmişi",
            "REALITY_CHECK": "%s dakikadır oynuyorsunuz, devam etmek istiyor musunuz?",
            "STAKE": "Bahis",
            "INFORMATION": "Bilgi",
            "CANCEL": "Ýptal",
            "EXIT_GAME": "Oyundan çýk",
            "OK": "Tamam",
            "QUIT": "Çýk",
            "GAME_LAUNCH_ERROR": "Oyun Yükleme Hatasý",
            "ERROR": "HATA",
            "INFO": "BÝLGÝ",
            "WARNING": "UYARI",
        }
    }
};
/**
 * CommonUI main Object.
 *
 * The CommonUI provides a Javascript commonUI
 * object with a set of methods to interact with GCM.
 *
 * In the game HTML it should gcm.js as the deploy structure should be:
 * +-base/
 * +----commonUI/
 * +--------index.html
 * +----gcm/
 * +--------js/
 * +------------gcm.js
 *
 * Therefore the path for GCMBridge should be:
 * '../gcm/gcmBridge.js'
 */

var commonUI = (
  function commonUI() {
    //public interface for commonUI html components
    return {
      'initGCMV4': MGSCommonUI.initGCMV4,
      'init': MGSCommonUI.init,
      'toggleTopbar': MGSCommonUI.toggleTopbar,
      'toggleMute': MGSCommonUI.toggleMute,
      'toggleTurbo': MGSCommonUI.toggleTurbo,
      'togglePaytable': CUIOptions.togglePaytable,
      'launchGame': MGSCommonUI.launchGame,
      'displayLoginDiv': MGSCommonUI.displayLoginDiv,
      'handleError': MGSCommonUI.handleError,
      'handleSessionStats': MGSCommonUI.handleSessionStats,
      'handleFreebetAward': MGSCommonUI.handleFreebetAward,
      'handleBonusBarFilled': MGSCommonUI.handleBonusBarFilled,
      'handleBonusBarUpdate': MGSCommonUI.handleBonusBarUpdate,
      'handleSessionDurationUpdate': MGSCommonUI.handleSessionDurationUpdate
    };
  }()
);

var gcm_ = null;
var urlParams = null;
var gcmVersion = "v3";

CUIClock = function(){

    this.getCurrentTime = function(showSeconds){
        return getTime((showSeconds));
    };

    function getTime(showSeconds) {
        var now = new Date();
        var seconds = '';

        seconds = (showSeconds)? ":" + (now.getSeconds() < 10 ? '0' : '') + now.getSeconds() : '';

        return ((now.getHours() < 10)? '0' : '') + now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes() + seconds;
    }
};

CUITimer = function(){
    this.timerValue = 0;

    this.startTimer = function(elapsedTime){
        var initialTime = new Date().getTime()/1000;

        setInterval(function(){
            var newTimeInSeconds = new Date().getTime() / 1000;
            this.timerValue = (Math.floor(newTimeInSeconds - initialTime)) + elapsedTime;
        }.bind(this), 100);
    };

    this.getCurrentTime = function(showSeconds){
        return formatTime(this.timerValue, showSeconds);
    };

    function formatTime(timeInSeconds, showSeconds){
        var hours, minutes, seconds = timeInSeconds;

        hours = Math.floor(seconds / 3600);
        seconds -= (hours * 3600);

        minutes = Math.floor(seconds / 60);
        seconds -= (minutes * 60);

        seconds = (showSeconds)? ":" + ((seconds < 10)? '0':'') + seconds : '';

        return ((hours < 10)? '0' : '') + hours + ':' + ((minutes < 10)? '0' : '') + minutes + seconds;
    }
};