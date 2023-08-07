import axios from "axios";
import 'whatwg-fetch'

const API_BASE_URL = "http://localhost:4001/"

class HttpService {

    constructor(authToken) {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
    }

    addTask = (title, description, startDate, dueDate, owner) => {
        return this.api.post('http://localhost:4001/task/add', {
            title,
            description,
            startDate,
            dueDate,
            owner
        }).then(response => {
            return response.data
        }).catch(err => {
            console.log(err)
            throw err
        })
    }

    updateTask = (newTask) => {
        return this.api.put('http://localhost:4001/task/update', {
            _id: newTask._id,
            title: newTask.title,
            description: newTask.description,
            startdate: newTask.startDate,
            dueDate: newTask.dueDate,
            completed: newTask.completed
        }).then(response => {
            console.log("Task Updated Succesfully")
            return response.data
        }).catch(err => {
            console.log("An error occured when updating task")
            throw err
        })
    }

    deleteTask = (taskId) => {
        return this.api.delete(`http://localhost:4001/task/delete/${taskId}`).then(response => {
            return response.data
        }).catch(err => {
            console.log("An error occured when deleting a task")
            throw err
        })
    }


    loginUser = (uid) => {
        return this.api.post('http://localhost:4001/login', {
            firebaseUid: uid
        }).then(response => {
            console.log(response.data)
            return response.data
        }).catch(err => {
            throw err
        })
    }


    signUpUser = (uid) => {
        return this.api.post('http://localhost:4001/signup', {
            firebaseUid: uid
        }).then(response => {
            return response.data
        }).catch(err => {
            throw err
        })
    }


    getTasks = (filter, page, itemsPerPage) => {
        return this.api.get('http://localhost:4001/tasks/', {
            params: {
                filter,
                page,
                itemsPerPage
            }
        }
        ).then(response => {
            return {
                tasks: response.data.tasks,
                totalPages: response.data.totalPages
            }
        }).catch(err => {
            throw err
        })
    }

    fetchStats = () => {
        return this.api.get('http://localhost:4001/tasks/stats').then(response => {
            return response.data
        })
    }

}

export default HttpService