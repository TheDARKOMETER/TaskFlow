const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String, default: 'Untitled Task' },
    description: { type: String, default: 'No description' },
    startDate: { type: Date, required: true },
    dueDate: {type: Date, required: true},
    completed: { type: Boolean, default: false },
    missed: {type: Boolean, default: false},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task;