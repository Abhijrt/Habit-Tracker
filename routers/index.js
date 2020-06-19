// importing the express server
const express = require('express');

// taking the router from the express server
const router = express.Router();

// taking the controller 
const homeController = require('../controllers/home_controller');

// calling the controller on the get method come for the url
router.get('/',homeController.home);
router.post('/create',homeController.create);
router.get('/week',homeController.week);
console.log("Router Loaded");
// Export the router to user in another file
module.exports = router;