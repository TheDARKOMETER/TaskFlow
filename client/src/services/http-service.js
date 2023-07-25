import axios from "axios";
import 'whatwg-fetch'

class HttpService {
    addTask = (authToken, title, description, startDate, dueDate, owner) => {
        return new Promise((res, rej) => {
            axios.post('http://localhost:4001/task/add', {
                title: title,
                description: description,
                startDate: startDate,
                dueDate: dueDate,
                owner: owner
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }).then(response => {
                res(response.data)
            }).catch(err => {
                console.log(err)
                rej(err)
            })
        })
    }

    loginUser = (authToken, uid) => {
        console.log(authToken)
        return new Promise((res, rej) => {
            axios.post('http://localhost:4001/login', {
                firebaseUid: uid
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }).then(response => {
                console.log(response.data)
                res(response.data)
            }).catch(err => {
                rej(err)
            })
        })
    }

    signUpUser = (authToken, uid) => {
        return new Promise((res, rej) => {
            axios.post('http://localhost:4001/signup', {
                firebaseUid: uid
            }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }).then(response => {
                res(response.data)
            }).catch(err => {
                rej(err)
            })
        })
    }

    getTasks = (authToken) => {
        return new Promise((res, rej) => {
            axios.get('http://localhost:4001/tasks/all', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            }).then(response => {
                res(response.data)
            }).catch(err => {
                rej(err)
            })
        })
    }

}

export default HttpService