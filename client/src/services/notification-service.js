export const NOTIF_TASK_CHANGED = "notif_task_changed"

const observers = {}
let instance = null
class NotificationService {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }

    addObserver = (notifName, callBack) => {
        if (!observers[notifName]) {
            observers[notifName] = []
        }
        observers[notifName].push({ callBack })
    }


    removeObserver = (notifName, callBack) => {
        if (observers[notifName]) {
            let index = observers[notifName].findIndex((obj) => obj.callBack === callBack)
            if (index !== -1) {
                observers[notifName].splice(index, 1)
            }
        }
    }

    postNotification = (notifName, data) => {
        observers[notifName].forEach((observer) => {
            observer.callBack(data)
        })
    }

}

export default NotificationService