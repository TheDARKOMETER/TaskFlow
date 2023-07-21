const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db');
const admin = require('firebase-admin')
const authenticateUser = require('./authenticateUser')

const Task = require('./models/task')
const User = require('./models/user')

// app.use(authenticateUser)

app.use(
    cors({
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        optionsSuccessStatus: 204, // Optional: Returns 204 No Content for pre-flight requests

    })
)

app.use(express.json())

const startDBServer = async () => {
    try {
        await db.connectToDatabase()
    } catch (error) {
        console.log('Error starting the server', error)
    }
}


app.get('/dashboard', authenticateUser, (req, res) => {
    // console.log("Congrats!" + req.user.uid)
    res.status(200).send("You are authorized to see this")
})



// app.get('/test', (req, res) => {
//     var obj = {
//         "message": "Hello!"
//     }
//     res.send(obj)
// })

// app.post('/test', (req, res) => {
//     console.log(req.body.userToken)
//     res.status(200).send({token: req.body.userToken}) 
// })

startDBServer()

// app.post('/task', (req, res) => {
//     var task = new Task();
//     task.title = req.body.title
//     task.description = req.body.description
//     task.startDate = req.body.startdate
//     task.dueDate = req.body.dueDate
//     task.owner = req.body.
//         console.log(req.body)
//     res.status(200).send(req.body)
// })


// app.post('/login', (req, res) => {
//     console.log(req.body.userToken)
//     res.status(200).send({userToken: req.body.userToken})
// })

// app.post('/login', (req, res) => {
//     var user = new User();
//     console.log(req.user.uid)
//     res.status(200).send(req.user.uid)
// })

// app.get('/', (req, res) => {
//     var obj = {
//         "name": "Test"
//     }

//     res.send(obj)
// })




app.listen(4001, () => {
    console.log("Running on port 4001")
})

