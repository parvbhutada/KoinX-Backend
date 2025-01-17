import mongoose from 'mongoose';

function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/crypto-stats')
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.error("MongoDB connection error:", err);
            process.exit(1);
        });
}

export default connect;