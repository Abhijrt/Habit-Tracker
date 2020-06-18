// import the mongoose
const mongoose = require('mongoose');

// creating the schema
const habitSchema = new mongoose.Schema({
    habit : {
        type : String,
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    },
    routine : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

const Habit = mongoose.model('Habit',habitSchema);
module.exports = Habit;