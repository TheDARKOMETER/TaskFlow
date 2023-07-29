import HttpService from "./http-service"
import NotificationService, { NOTIF_TASK_CHANGED } from "./notification-service"

let instance = null
let http
const ns = new NotificationService()
class DataService {
    constructor() {
        if (!instance) {
            instance = this
        }
        return instance
    }

    addTask = (title, description, startDate, dueDate, owner) => {
        return http.addTask(title, description, startDate, dueDate, owner)
            .then(() => {
                return this.getTasks().catch((err) => {
                    throw err
                })
            }).then(response => {
                ns.postNotification(NOTIF_TASK_CHANGED, response)
                return response
            }).catch(err => {
                throw err
            })
    }

    getTasks = () => {
        return http.getTasks()
    }

    setHttpAuth = (authToken) => {
        http = new HttpService(authToken)
    }
}

export default DataService