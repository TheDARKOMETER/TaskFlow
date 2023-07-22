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

    loadUserDashboard = (authToken, url) => {
        return new Promise((res, rej) => {
            axios.get('http://localhost:4001/dashboard', {
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

    // testAuth = () => {

    // }


    // testGetMethod = () => {
    //     var message = new Promise((res, rej) => {
    //         axios.get('http://localhost:4001/test').then(response => {
    //             res(response.data)
    //         }
    //         ).catch((err) => {
    //             rej(err)
    //         })
    //     })

    // var message = new Promise((res, rej) => {
    //     fetch('http://localhost:4001/test').then(response => {
    //         res(response.json())
    //     }).catch(err => {
    //         rej(err)
    //     })
    // })

    //     return message
    // }

    // testGetToken = (authToken) => {
    //     console.log(authToken)
    //     return new Promise((res, rej) => {
    //         axios.post('http://localhost:4001/login', { userToken: authToken }).then(response => {
    //             res(response.data)
    //         }
    //         ).catch((err) => {
    //             rej(err)
    //         })
    //     })
    // }


}

export default HttpService