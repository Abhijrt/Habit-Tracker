const express = require('express');
const port = 8000;
const app = express();

app.listen(port,function(err){
    if(err){
        console.log("Error while connecting to the database");
        return;
    }
    console.log("Successfully Connected to the Database");
});
