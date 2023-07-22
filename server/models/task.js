const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    title: { type: String, default: 'Untitled Task' },
    description: { type: String, default: 'No description' },
    startDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    missed: { type: Boolean, default: false },
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task;