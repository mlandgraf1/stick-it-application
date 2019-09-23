//this file specifies the API route which is the
//name you use to access endpoints used in the URL

//import statements
const express = require("express");
const bodyParser = require('body-parser');
const getAllData = require("../controllers/hockeyController").getAllData;
const getSingleData = require("../controllers/hockeyController").getSingleData

//creates express application and assigns it to app
const app = express();
app.use(bodyParser.json());

//used app.get to handle GET requests
//these are my routes - getAllData and getSingleData functions
//are defined in the hockeyController.js file
app.get('/hockey', getAllData);
app.get('/hockey/:flex/:curve/:ageLevel/:price', getSingleData)

//used to publish variables and functions to the consumer of a module when dividing program code
//over multiple files
module.exports = app;