// importing the mongoose
const mongoose = require('mongoose');

// habitStatus Schema
const habitStatusSchema = new mongoose.Schema({
        habit: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Habit',
            required:true,  
        },
        habitStatus:{
            type:String,
            required:true,
        },
        createdDate:{
            type:String,
            require:true,
        }
    },{
        timestamps:true,
    }
);

const HabitStatus = mongoose.model('HabitStatus',habitStatusSchema);
module.exports = HabitStatus;