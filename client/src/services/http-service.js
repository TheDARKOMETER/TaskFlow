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


    getTasks = () => {
        return this.api.get('http://localhost:4001/tasks/all'
        ).then(response => {
            return response.data
        }).catch(err => {
            throw err
        })
    }


}

export default HttpService