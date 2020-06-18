// importing the express
const express = require('express');

// given the port number
const port = 8000;

// taking the express as a app
const app = express();

// adding the view and view engine
app.set('view engine','ejs');
app.set('views','./views');

// tell the server to use layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// tell the server to use router
app.use('/',require('./routers'));

// Tell the server to run on the port number
app.listen(port,function(err){
    if(err){
        console.log("Error while connecting to the Server");
        return;
    }
    console.log("Successfully Connected to the Server");
});
