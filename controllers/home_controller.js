// importing the Habit schema
const Habit = require('../models/habit');
const HabitStatus = require('../models/habitStatus');

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
        let newHabit = await Habit.create(req.body);
        if(req.xhr){
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

// showing the day status
module.exports.dayStatus = function(req,res){
    let habitDate = new Date(req.query.date);
    let date = habitDate.toLocaleDateString();
    HabitStatus.findOne({habit:req.query.id,createdDate:date},function(err,habitData){
        if(req.xhr){
            if(habitData){
                return res.status(200).json({
                    data:{
                        habitData:habitData.habitStatus,
                        date:date,
                        habit_id:req.query.id
                    },
                    message:"entry match"
                });
            }else{
                return res.status(200).json({
                    data:{
                        habitData:"null",
                        date:date,
                        habit_id:req.query.id
                    },
                    message:"entry not match",
                });
            }
        }
    });
}

// changing the status of the perticular date
module.exports.changeStatus = function(req,res){
    let status = null;
    if(req.query.status != 'null'){
        status = req.query.status;
    }
    let findDate = req.query.date;
    HabitStatus.findOne({habit:req.query.id,createdDate:findDate},function(err,statusId){
        if(statusId){
            statusId.updateOne({habitStatus:status});
            statusId.save();
        }else{
           Habit.findById(req.query.id,function(err,habit){
               if(habit){
                   HabitStatus.create({
                       habit:habit.id,
                       habitStatus:status,
                       createdDate : findDate
                   });
               }
           })
        }
        if(req.xhr){
            return res.status(200).json({
                message:"Habit Status Created"
            })
        }
        return res.redirect('back');
    });
}

