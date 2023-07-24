const mongoose = require('mongoose')

const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    return new Date(year, month, day);
};

const taskSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    title: { type: String, default: 'Untitled Task' },
    description: { type: String, default: 'No description' },
    startDate: {
        type: Date,
        required: true,
        min: [getCurrentDate, `Date must not be set in the past, got {VALUE}`]
    },
    dueDate: {
        type: Date,
        required: true,
        min: [getCurrentDate, `Date must not be set in the past {VALUE}`]
    },
    completed: { type: Boolean, default: false },
    missed: { type: Boolean, default: false },
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task;