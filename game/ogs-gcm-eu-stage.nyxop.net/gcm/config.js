var GCMConfig = (function () {
    var _gcmList = {
            "production": "https://ogs-gcm-eu-prod.nyxop.net/gcm/gcm-core/gcm.js",
            "dev": "https://ogs-gcm-eu-dev.nyxop.net/gcm/gcm-core/gcm.js",
            "stage": "https://ogs-gcm-eu-stage.nyxop.net/gcm/gcm-core/gcm.js",
        };

    var _getGCMUrl = function (environment) {
        var gcm = _gcmList[environment];
        if (gcm === undefined) {
            gcm = _gcmList.production;
        }
        return gcm
    };

    return {
        getGCMUrl: _getGCMUrl
    };
})();
