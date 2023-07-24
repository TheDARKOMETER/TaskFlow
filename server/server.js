const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db');
const admin = require('firebase-admin')
const authenticateUser = require('./authenticateUser')
const PORT = 4001

const Task = require('./models/task')
const User = require('./models/user');
const bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({
    extended: true
}))

const startDBServer = async () => {
    try {
        await db.connectToDatabase()
    } catch (error) {
        console.log('Error starting the server', error)
    }
}

const checkIfUserExists = (firebaseUid) => new Promise((res, rej) => {
    console.log("Executing looking for " + firebaseUid)
    User.find({ firebaseUid }).then((result) => {
        return res(result.length > 0)
    }).catch((err) => {
        return rej(err)
    })
})

startDBServer()

app.get('/dashboard', authenticateUser, (req, res) => {
    // TODO: Once get request at path /dashboard is sent, load the task data for the user
    Task.find({ owner: req.user.uid }).then(tasks => {
        console.log(tasks)
        console.log("Sending data to client")
        res.status(200).send(tasks)
    }).catch(() => {
        res.status(500).send({ "error": "an error has occured" })
    })
})


app.post('/login', authenticateUser, (req, res) => {
    console.log(req.body.firebaseUid)
    var newUser = new User() // Alternatively you could do var user = new User({ firebaseUid })
    newUser.firebaseUid = req.body.firebaseUid
    checkIfUserExists(newUser.firebaseUid).then((result) => {
        if (result) {
            console.log("user already exists")
            res.status(200).send({ message: "User already exists" })
        } else {
            console.log("User doesnt exist")
            newUser.save().then((savedUser) => {
                console.log("Successfully saved user: ", newUser.firebaseUid)
                res.status(200).send(savedUser)
            }).catch((err) => {
                console.log("Error saving user: ", err)
                res.status(500).send({ error: "error saving user" })
            })
        }
    }).catch(() => {
        console.log("An error has occured")
        res.status(500).send({ error: "An error has occured" })
    })
})

app.post('/signup', authenticateUser, (req, res) => {
    var newUser = new User()
    newUser.firebaseUid = req.body.firebaseUid
    newUser.save().then((savedUser) => {
        console.log("Successfully saved user: ", newUser.firebaseUid)
        res.status(200).send(savedUser)
    }).catch((err) => {
        console.log("Error saving user: ", err)
        res.status(500).send({ error: "error saving user" })
    })
})

app.post('/task/add', authenticateUser, (req, res) => {
    var newTask = new Task()
    newTask.title = req.body.title
    newTask.description = req.body.description
    newTask.startDate = req.body.startDate
    newTask.dueDate = req.body.dueDate
    newTask.owner = req.body.owner
    newTask.save().then((savedTask) => {
        console.log(`Successfully saved task: ${savedTask} by ${savedTask.owner}`)
        res.status(200).send(newTask)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
})







app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

