export class EventDispatcher {
  constructor() {
    /** @private
     * @type {Object}
     * */
    this.listeners_ = {};
  }

  addEventListener(eventStr, eventListener, scope) {
    if (!this.listeners_[eventStr]) {
      this.listeners_[eventStr] = new Array();
    }

    for (let i = 0; i < this.listeners_[eventStr].length; ++i) {
      const listenerObj = this.listeners_[eventStr][i];
      //Skip add event listener if the same listener is already in list.
      if (listenerObj.func == eventListener && listenerObj.scope == scope)
        return;
    }

    this.listeners_[eventStr].push({ func: eventListener, scope: scope });
  }

  removeEventListener(eventStr, eventListener, scope) {
    const listenerQueue = this.listeners_[eventStr];

    if (listenerQueue) {
      if (eventListener) {
        for (let i = 0; i < listenerQueue.length; ++i) {
          const currentListener = listenerQueue[i].func;
          const caller = listenerQueue[i].scope;
          if (eventListener == currentListener && scope == caller) {
            listenerQueue.splice(i, 1);
            break;
          }
        }
      }
      else
        listenerQueue.splice(0, listenerQueue.length);
    }
  }

  dispatchEvent(event) {
    event.target = this;
    const listenerQueue = this.listeners_[event.name];

    if (listenerQueue) {
      for (let i = 0; i < listenerQueue.length; ++i) {
        const func = listenerQueue[i].func;
        const scope = listenerQueue[i].scope;
        func.call(scope, event);
      }
    }
  }
}


// WEBPACK FOOTER //
// ./src/main/EventDispatcher.js