import HttpService from "./http-service"
import NotificationService, { NOTIF_TASK_CHANGED } from "./notification-service"

let instance = null
const http = new HttpService()
const ns = new NotificationService()
class DataService {
    constructor() {
        return instance ? this : instance
    }

    addTask = (authToken, title, description, startDate, dueDate, owner) => {
        return http.addTask(authToken, title, description, startDate, dueDate, owner)
            .then(() => {
                return this.getTasks(authToken).catch((err) => {
                    throw err
                })
            }).then(response => {
                ns.postNotification(NOTIF_TASK_CHANGED, response)
                return response
            }).catch(err => {
                throw err
            })
    }

    getTasks = (authToken) => {
        return http.getTasks(authToken)
    }
}

export default DataService