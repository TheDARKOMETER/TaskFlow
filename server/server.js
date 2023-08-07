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
    const { filter, page, itemsPerPage } = req.query
    let promises = []
    // console.log(filter)
    const findQuery = { owner: req.user.uid }
    if (filter === 'due') {
        findQuery.completed = false
        findQuery.missed = false
    } else if (filter === 'missed') {
        findQuery.missed = true
    } else if (filter === 'completed') {
        findQuery.completed = true
    }
    console.log(page)
    console.log(itemsPerPage)
    Task.countDocuments(findQuery).then((totalItems) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage)
        if (totalItems > 0) {
            Task.find(findQuery)
                .skip((page - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .then(tasks => {
                    const updateTasks = tasks.map((task) => {
                        if (new Date(task.dueDate).toLocaleDateString() < new Date(Date.now()).toLocaleDateString()) {
                            task.missed = true
                        }
                        // console.log(new Date(task.dueDate).toLocaleDateString())
                        return task.save({ validateBeforeSave: false })
                    })
                    return Promise.all(updateTasks).then(() => {
                        console.log("Sending data to client")
                        res.status(200).json({
                            tasks,
                            totalPages,
                            totalItems
                        })
                    })
                }).catch((err) => {
                    console.log(err + ` currPage ${page} & iPerPage ${itemsPerPage}`)
                    res.status(500).send({ "error": "an error has occured" })
                })
        } else {
            res.status(200).json({
                tasks: [],
                totalPages: 1,
                totalItems: 0
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).send({ error: "an error has occured" })
    })
})

app.get('/tasks/stats', authenticateUser, (req, res) => {
    let dueCount = Task.countDocuments({ owner: req.user.uid, completed: false, missed: false })
    let completedCount = Task.countDocuments({ owner: req.user.uid, completed: true })
    let missedCount = Task.countDocuments({ owner: req.user.uid, missed: true })
    let allCount = Task.countDocuments()
    Promise.all([dueCount, completedCount, missedCount, allCount])
        .then(([dueCount, completedCount, missedCount, allCount]) => {
            res.status(200).json({
                dueCount,
                completedCount,
                missedCount,
                allCount
            })
        }).catch((err) => {
            console.log(err)
            res.sendStatus(500)
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

app.delete('/task/delete/:id', authenticateUser, (req, res) => {
    Task.deleteOne({ _id: req.params.id }).then(result => {
        console.log("Task deleted")
        res.status(200).send(result)
    }).catch((err) => {
        console.log(err)
        res.status(500).send({ err: "An error occured" })
    })
})


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

