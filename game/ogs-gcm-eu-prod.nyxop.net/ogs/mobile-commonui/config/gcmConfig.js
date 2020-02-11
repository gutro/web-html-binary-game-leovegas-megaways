var GCMConfig = (function() {
    // Set this variable to OGS launcher's hostname for the environment.
    var _launcherHostName = "https://ogs-gcm-eu-prod.nyxop.net";
    var _ccy_formatter_url = "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-example-commonui/js/util/currencyFormat.js";
    var _translations_url = "https://ogs-gcm-eu-prod.nyxop.net/ogs/desktop-commonui/js/translations/";
    return {
      launcherHostName: _launcherHostName,
      ccyFormatterUrl: _ccy_formatter_url,
      translationUrl: _translations_url
    };
})();
