const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firebaseUid: { type: String, required: true, unique: true },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            }
        ]
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;