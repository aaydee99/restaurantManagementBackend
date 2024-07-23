const { default: mongoose } = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB', err));

}

exports.connectDB = connectDB;