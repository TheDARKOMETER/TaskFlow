const mongoose = require('mongoose')


const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://Vonchez:KevinIs19!@atlascluster.inu6gpk.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}

module.exports = {
    connectToDatabase
}