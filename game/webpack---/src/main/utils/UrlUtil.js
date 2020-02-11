/**
 * UrlUtil (<b>com.openbet.gcm.urlutil</b>) provides utility
 * functions for manipulating url string and request parameters.
 *
 * Using this util game/commonUI developer can get/add/update url request parameters.
 * This functionality is exposed in com.openbet.gcm.urlutil.
 *
 *
 * @author xliu
 * @namespace
 */


export class UrlUtil {

  /**
 * Gets a parameter value from the passed in URL There are other ways to
 * implement this that could be quicker This solution is used here because it is
 * easy to follow
 * @param {string} url url to add params.
 * @param {Object} params object representing params to be added.
 * @return {string} encoded string url.
 */
  static addParametersToUrl(url, params) {

    for (var p in params) {
      var param = p + '=' + encodeURIComponent(params[p]);

      var sep = '&';
      if (url.indexOf('?') < 0) {
        sep = '?';
      } else {
        var lastChar = url.slice(-1);
        if (lastChar == '&') sep = '';
        if (lastChar == '?') sep = '';
      }
      url += sep + param;

    }
    return url;
  };

  /**
 * Gets a parameter value from the passed in URL There are other ways to
 * implement this that could be quicker This solution is used here because it is
 * easy to follow
 * @param {string} name request parameter name.
 * @param {string} search (this can be obtained from window.location.search).
 * @return {?string} request parameter value.
 */
  static getSearchParameterByName(name, search) {

    if (typeof (name) !== 'string') {
      throw new Error(
        'gcmBridge.getSearchParameterByName: Invalid argument name - not a string');
    }
    if (typeof (search) !== 'string') {
      throw new Error(
        'gcmBridge.getSearchParameterByName: Invalid argument search - not a string');
    }

    /** @type {RegExp} */
    var pattern;
    /** @type {Array} */
    var match;
    pattern = new RegExp('[?&]' + name + '=([^&]*)');
    match = pattern.exec(search);

    if (match && match.length > 1)
      return decodeURIComponent(match[1].replace(/\+/g, ' '));
    else
      return null;
  };

  /**
 * Update a parameter value from the passed in URL. <br>
 * @param {string} name request parameter name.
 * @param {string} newValue thenew value for request parameter.
 * @param {string} url (this can be obtained from window.location.href).
 * @return {?string} The new url with updated request parameter.
 */
  static updateSearchParameterByName(name, newValue, url) {
    var originalValue = UrlUtil.getSearchParameterByName(name, url);
    var newURL = url;
    if (originalValue) {
      newURL = url.replace(name + '=' + originalValue, name + '=' + newValue);
    }
    return newURL;
  };

  /**
   * This function returns a object of gcm params. <br>
   * For getting the gcm parameter's values, first gcmParams parameter's value will be
   * fetched from URL using UrlUtil.getSearchParameterByName function. The example of gcmParams variable
   * is detailed below : <br>
   * gcmParams=gcmPlayMode%3Dreal|   <br>
   *           gcmChannel%3DI| <br>
   *           gcmGameName%3Dgcm-example-game| <br>
   *           gcmCommonUIURL%3D%2Fgcm-tests%2Fgcm-example-commonui%2Fcommonui.html   <br>
   * The returned gcmParams variable is passed in this function to extract gcm parameters and its values.  <br>
   * All the extracted items will stored in array object as gcmParamsObject.
   * @param {string} gcmParams gcmParams value as string.
   * @return {Object} gcmParamsObject Object contains decoded gcm Parameters and its values. <br>
   *                                  the indices of values are removed 'gcm' prefix. <br>
   *                                  e.g. 'gcmGameName' will become 'gameName' as index in the returned object.
   */
  static getGCMParams(gcmParams) {
    var gcmParamsObject = {};
    if (gcmParams != null) {
      var extractedGCMParams = decodeURIComponent(gcmParams).split('|');
      var i = 0;
      for (i = 0; i < extractedGCMParams.length; i++) {
        var gcmParameter = extractedGCMParams[i].split('=');
        var gcmParameterKey = gcmParameter[0];
        gcmParameterKey = gcmParameterKey.replace('gcm', '');
        gcmParameterKey = gcmParameterKey.charAt(0).toLowerCase() + gcmParameterKey.slice(1);
        gcmParamsObject[gcmParameterKey] = gcmParameter[1];
      }
    }
    return gcmParamsObject;
  };

  /**
 * This function updates the parameter value in gcmParams request parameter
 * @param {string} name request parameter name.
 * @param {string} newValue the new value for request parameter.
 * @param {string} url (this can be obtained from window.location.href).
 * @return {?string} The new url with updated request parameter.
 * This function will be called only when gcmParams request parameter needs
 * to be updated.
 * For example changing the gcmPlayMode from "demo" to "real.
 */
  static updateGCMParams(name, newValue, url) {
    var originalValue = '';

    var gcmParamsObject = new Array();
    var gcmParams = UrlUtil.getSearchParameterByName('gcmParams', url);
    if (gcmParams != null) {
      gcmParamsObject = UrlUtil.getGCMParams(gcmParams);
      var gcmParameterKey = name.replace('gcm', '');
      gcmParameterKey = gcmParameterKey.charAt(0).toLowerCase() + gcmParameterKey.slice(1);
      originalValue = gcmParamsObject[gcmParameterKey];
    }
    var newURL = url;
    if (originalValue) {
      newURL = url.replace(name + '%3D' + originalValue, name + '%3D' + newValue);
    }
    return newURL;
  };

  /**
 * This function is used to expose gcm param values to commonUI/Game. <br>
 * As soon as gcm.js is loaded during game loading phase, commonUI or Game can call this function to get gameplay information
 * such playMode, gameName, channel etc without having to wait for configReady() call from GCM.
 * CommonUI no longer needs to read this information from url passed by Game and Game no longer has to worry about passing
 * these params to CommonUI.
 * Currently this function provides all the parameters available in gcmParams object. This can be extended to included
 * any other url params.
 * gcmParams=gcmPlayMode%3Dreal|   <br>
 *           gcmChannel%3DI| <br>
 *           gcmGameName%3Dgcm-example-game| <br>
 *           gcmCommonUIURL%3D%2Fgcm-tests%2Fgcm-example-commonui%2Fcommonui.html   <br>
 * @return {Object} urlParamsObject Object contains params like playMode, gameName etc
 */
  static getUrlParams() {

    var urlParamsObject = {};
    var gcmParams = UrlUtil.getSearchParameterByName('gcmParams', window.parent.location.href);
    if (gcmParams) {
      urlParamsObject = UrlUtil.getGCMParams(gcmParams);
    } else {
      // In case we do not have gcmParams in game window url, we should search for the params in commonUI window url.
      // These data items are added to commonUI url from OpenBet gcmBridge.
      urlParamsObject['gameName'] = UrlUtil.getSearchParameterByName('gameName', window.location.search);
      urlParamsObject['playMode'] = UrlUtil.getSearchParameterByName('playMode', window.location.search);
      urlParamsObject['channel'] = UrlUtil.getSearchParameterByName('channel', window.location.search);
    }
    return urlParamsObject;
  }

  static getLaunchParamsObj(pgParams) {
    var gcmParamsObject = {};
    if (pgParams != null) {
      var extractedGCMParams = decodeURIComponent(pgParams).split('&');
      var i = 0;
      for (i = 0; i < extractedGCMParams.length; i++) {
        var gcmParameter = extractedGCMParams[i].split('=');
        var gcmParameterKey = gcmParameter[0];
        gcmParameterKey = gcmParameterKey.charAt(0).toLowerCase() + gcmParameterKey.slice(1);
        gcmParamsObject[gcmParameterKey] = gcmParameter[1];

      }
    }
    return gcmParamsObject;
  };

  /**
   * checks if the uri paramater is a relative URI
   * This function protects us from
   * the potential security risk of rendering absolute url content that has been
   * specified as a request param
   * Note that not all relative URIs are allowed, but we do reject absolute URIs and
   * network-path references.
   * @param {string} url the URL to check.
   * @return {boolean} is this a relative url.
  */
  static checkURIIsRelative(url) {

    if (typeof (url) !== 'string') {
      throw new Error(
          'UrlUtil.checkURIIsRelative: Invalid argument url - not a string');
    }

    // firstly we check that the URI doesn't start with either "<protocol>://" or
    // "//"
    // these would signify an absolute URI or a network-path reference, both of
    // which
    // would allow content from another domain.
    // anything else should be a URI requesting content from the same domain
    // note that www.google.com is not an absolute URI.  if you use 'www.google.com' as a link
    // from a page at http://www.openbet.com/games then the link will go to
    // http://www.openbet.com/games/www.google.com
    // also note that //www.google.com is a network-path reference.  If you use '//www.google.com'
    // as a link from a page at http://www.openbet.com/games then it will go to
    // http://www.google.com
    // more details can be found at http://tools.ietf.org/html/rfc3986

    if ((/^([a-z0-9+.-]+):\/\//).test(url)) {
      return false;
    }

    if ((/^\/\//).test(url)) {
      return false;
    }

    //we allow alphanumeric, "/", "_", "-", "." only
    //this is more restrictive than the full set of allowed URIs but we don't want to allow
    //features like request parameters etc. through at this stage
    return (/^[a-zA-Z0-9\/\.\-_]*$/).test(url);
  };

  static getAllParams(strUrl, isDesktop) {
       var keyPairs = [];
       var params = null;

       if(isDesktop){
         //passed in from launcher, window.location.search (query string portion of the URL)
         params = strUrl.substring(1).split('&');
       }else{
         // passed in from game init() (full URL with domain and "?")
         params = strUrl.slice(strUrl.indexOf('?') + 1).split('&');
       }

       for (var i = params.length - 1; i >= 0; i--) {
         var nameValPair = params[i].split('=');
           keyPairs.push(nameValPair);
       };

       return keyPairs;
   }
}

/**
 * Create and export singleton
 */
const instance = new UrlUtil()
export default instance



// WEBPACK FOOTER //
// ./src/main/utils/UrlUtil.js