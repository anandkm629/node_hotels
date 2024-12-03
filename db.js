const mongoose = require('mongoose');
// Define the MongoDB URL 
const mongoURL = 'mongodb://localhost:27017/hotels'  // mydatabase is database name

// setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to mongoDB Server');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error : ' ,err);
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

module.exports = db;