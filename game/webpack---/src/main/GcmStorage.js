const STORAGE_ID = {
    SYNDICATED_MESSAGES_CACHE: "GCM_sj_notifications"
};

export class GcmStorage {
    getSyndicatedNotifications(){
        if(localStorage.getItem(STORAGE_ID.SYNDICATED_MESSAGES_CACHE) === null){
            localStorage.setItem(STORAGE_ID.SYNDICATED_MESSAGES_CACHE, JSON.stringify([]))
        }
        return JSON.parse(localStorage.getItem(STORAGE_ID.SYNDICATED_MESSAGES_CACHE))
    }

    hasSyndicatedMessageBeenShow(messageId){
        const knownNotifications = this.getSyndicatedNotifications();
        return knownNotifications.includes(messageId);
    }

    appendShownSyndicationMessage(messageid){
        const knownNotifications = this.getSyndicatedNotifications();
        knownNotifications.push(messageid)
        localStorage.setItem(STORAGE_ID.SYNDICATED_MESSAGES_CACHE, JSON.stringify(knownNotifications))
    }
}


// WEBPACK FOOTER //
// ./src/main/GcmStorage.js