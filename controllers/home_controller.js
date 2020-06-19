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
module.exports.create = async function(req,res){
    try{
        console.log(req.body);
        let newHabit = await Habit.create(req.body);
        if(req.xhr){
            console.log("We are in ajax call");
            return res.json(200,{
                message:"Added List Successfully!",
                data:{
                    newHabit:newHabit
                }
            })
        }
        return res.redirect('back');
    }catch(err){
        console.log("Error on saving the data to the database");
    }
}

// to show the week view
module.exports.week = function(req,res){
    Habit.find({},function(err,habits){
        if(err){
            console.log("Error on fetching the habits from database");
            return;
        }
        return res.render('weekview',{
            title : "Week View",
            habits : habits
        });
    });
}