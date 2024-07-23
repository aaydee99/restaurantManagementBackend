const { default: mongoose } = require("mongoose");

const connectDB = () => {
    mongoose.connect('mongodb+srv://root:1234@cluster0.q4pjree.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB', err));

}

exports.connectDB = connectDB;