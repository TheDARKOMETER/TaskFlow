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


app.use(
    cors({
        origin: ['http://127.0.0.1:3000', 'http://localhost:3001', 'http://localhost:3000'],
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

const checkIfUserExists = (firebaseUid) => {
    console.log("Executing looking for " + firebaseUid)
    return User.find({ firebaseUid }).then((result) => {
        return result.length > 0
    }).catch((err) => {
        throw err
    })
}

startDBServer()

app.get('/tasks/', authenticateUser, (req, res) => {

    const { filter } = req.query
    console.log(filter)

    const findQuery = { owner: req.user.uid }
    if (filter === 'due') {
        findQuery.completed = false
        findQuery.missed = false
    } else if (filter === 'missed') {
        findQuery.missed = true
    } else if (filter === 'completed') {
        findQuery.completed = true
    }

    Task.find(findQuery).then(tasks => {
        console.log("Sending data to client")
        if (tasks.length > 0) {
            const updateTasks = tasks.map((task) => {
                if (new Date(task.dueDate).toLocaleDateString() < new Date(Date.now()).toLocaleDateString()) {
                    task.missed = true
                }
                console.log(new Date(task.dueDate).toLocaleDateString())
                return task.save({ validateBeforeSave: false })
            })
            return Promise.all(updateTasks).then(() => {
                res.status(200).send(tasks)
            })
        } else {
            res.status(200).send("No tasks found for the user")
        }
    }).catch((err) => {
        console.log(err)
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
    console.log(req.body.title)
    if (req.body.title) {
        newTask.title = req.body.title
    }
    newTask.description = req.body.description.replace(/%0D%0A|(%0A)/g, '\r\n');
    newTask.startDate = req.body.startDate
    newTask.dueDate = req.body.dueDate
    newTask.owner = req.user.uid
    newTask.save().then((savedTask) => {
        console.log(`Successfully saved task: ${savedTask} by ${savedTask.owner}`)
        res.status(200).send(newTask)
    }).catch((err) => {
        console.log(`${err} --- Error`)
        res.status(500).send({ error: err.message })
    })
})

app.put('/task/update', authenticateUser, (req, res) => {
    console.log("Trying to update")
    Task.updateOne({ _id: req.body._id }, {
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        completed: req.body.completed
    }).then(() => {
        console.log("Task Updated Succesfully")
        res.sendStatus(200)
    }).catch((err) => {
        console.log(err)
        res.status(500).send({ error: err })
    })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

