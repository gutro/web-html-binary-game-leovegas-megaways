/**
 * This global function exports the root.WebSocket as the ws module.
 * We need this to use it for the alias for the required dependency of the ws in the gamesparks lib.
 * Check the webpack.config.js for the alias module.exports.resolve.alias.ws.
 */
(function () {
    var ws = global.WebSocket || global.MozWebSocket;

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return ws;
        });
    }
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = ws;
    }
    else {
        this.ws = ws;
    }
}.call(this));


// WEBPACK FOOTER //
// ./src/main/libs/gamesparks/ws.js