// importing the Habit schema
const Habit = require('../models/habit');

// home controller for starting the project
module.exports.home = function(req,res){
    // return res.end('<h1>Hii you are good to go</h1>');
    Habit.find({},function(err,habits){
        if(err){
            console.log("Error on fetching the habits from database");
            return;
        }
        return res.render('home',{
            title : "Home Page",
            habits : habits
        });
    });
}

// module for creating the habit and storing into the database
module.exports.create = function(req,res){
    console.log(req.body);
    Habit.create(req.body,function(err,habit){
        if(err){
            console.log("Error while svaing the data to the database");
            return;
        }
        return res.redirect('back');
    });
}