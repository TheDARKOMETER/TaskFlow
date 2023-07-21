import axios from "axios";
import 'whatwg-fetch'

class HttpService {
    addTask = () => {
        axios.post('http://localhost:4001/')
    }

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

    testTokenAuthorizaion = (authToken) => {
        return new Promise((res, rej) => {
            axios.get('http://localhost:4001/dashboard', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
        }).then(response => {
            console.log(response.data)
        })
    }
}

export default HttpService