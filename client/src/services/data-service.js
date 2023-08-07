import HttpService from "./http-service"
import NotificationService, { NOTIF_TASK_CHANGED } from "./notification-service"

let instance = null
class DataService {
    constructor(httpService, filter, currentPage, itemsPerPage) {
        if (!instance) {
            instance = this
        }
        this.http = httpService
        this.ns = new NotificationService()
        this.filter = filter || 'all'
        this.currentPage = currentPage+1 || 1
        this.itemsPerPage = itemsPerPage || 6
        return instance
    }

    addTask = (title, description, startDate, dueDate) => {
        return this.http.addTask(title, description, startDate, dueDate)
            .then(() => {
                return this.getTasks('all', this.filter, this.currentPage, this.itemsPerPage)
            })
            .then(tasks => {
                this.ns.postNotification(NOTIF_TASK_CHANGED, tasks)
            })
            .catch(err => {
                throw err
            })
    }

    getTasks = (filter, page, itemsPerPage) => {
        return this.http.getTasks(filter, page, itemsPerPage)
    }

    fetchStats = () => {
        return this.http.fetchStats()
    }

    updateTask = (task) => {
        return this.http.updateTask(task)
            .then(() => {
                return this.getTasks(this.filter, this.currentPage, this.itemsPerPage)
            })
            .then(tasks => {
                this.ns.postNotification(NOTIF_TASK_CHANGED, tasks)
            })
            .catch(err => {
                throw err
            })
    }

    deleteTask = (taskId) => {
        return this.http.deleteTask(taskId).then(() => {
            return this.getTasks()
        }).then(tasks => {
            this.ns.postNotification(NOTIF_TASK_CHANGED, tasks)
        }).catch(err => {
            throw err
        })
    }

    setHttpAuth = (authToken) => {
        this.http = new HttpService(authToken)
    }
}

export default DataService