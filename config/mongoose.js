// importing the mongoose 
const mongoose = require('mongoose');

// connecting to the database and create new database
mongoose.connect('mongodb://localhost/habit-tracker-development');

// connect the database
const db = mongoose.connection;

// if any error come while connecting to the database
db.on('error',console.error.bind(console,"Error on Connecting to the Database"));

// when no error come while connecting to the database
db.once('open',function(){
    console.log("Successfully Connected to the Database");
});

// export the module to use in the project
module.exports = db;