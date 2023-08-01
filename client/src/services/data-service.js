import HttpService from "./http-service"
import NotificationService, { NOTIF_TASK_CHANGED } from "./notification-service"

let instance = null
class DataService {
    constructor(httpService) {
        if (!instance) {
            instance = this
        }
        this.http = httpService
        this.ns = new NotificationService()
        return instance
    }

    addTask = (title, description, startDate, dueDate) => {
        return this.http.addTask(title, description, startDate, dueDate)
            .then(() => {
                return this.getTasks()
            })
            .then(tasks => {
                this.ns.postNotification(NOTIF_TASK_CHANGED, tasks)
            })
            .catch(err => {
                throw err
            })
    }

    getTasks = (filter) => {
        return this.http.getTasks(filter)
    }

    updateTask = (task) => {
        return this.http.updateTask(task)
            .then(() => {
                return this.getTasks()
            })
            .then(tasks => {
                this.ns.postNotification(NOTIF_TASK_CHANGED, tasks)
            })
            .catch(err => {
                throw err
            })
    }

    setHttpAuth = (authToken) => {
        this.http = new HttpService(authToken)
    }
}

export default DataService