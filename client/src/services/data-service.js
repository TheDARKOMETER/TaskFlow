import HttpService from "./http-service"
import NotificationService, { NOTIF_TASK_CHANGED } from "./notification-service"

let instance = null
class DataService {
    constructor(httpService, filter = 'all', currentPage = 1, itemsPerPage = 6) {
        if (!instance) {
            instance = this
        }
        this.http = httpService
        this.ns = new NotificationService()
        this.filter = filter
        this.currentPage = currentPage
        this.itemsPerPage = itemsPerPage
        return instance
    }

    addTask = (title, description, startDate, dueDate) => {
        return this.http.addTask(title, description, startDate, dueDate)
            .then(() => {
                return this.getTasks(this.filter, this.currentPage + 1, this.itemsPerPage)
            })
            .then(tasks => {
                this.ns.postNotification(NOTIF_TASK_CHANGED, tasks)
            })
            .catch(err => {
                throw err
            })
    }

    getTasks = (filter, page, itemsPerPage) => {
        return this.http.getTasks(filter, page, itemsPerPage).catch(err => {
            throw err
        })
    }

    fetchStats = () => {
        return this.http.fetchStats().catch(err => {
            throw err
        })
    }

    updateTask = (task) => {
        return this.http.updateTask(task)
            .then(() => {
                return this.getTasks(this.filter, this.currentPage + 1, this.itemsPerPage)
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
            return this.getTasks(this.filter, this.currentPage + 1, this.itemsPerPage)
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