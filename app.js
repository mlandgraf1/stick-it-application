//deployed application: http://ec2-54-205-228-135.compute-1.amazonaws.com:3000/
//import statements
require('dotenv').config();
const express = require("express");
//parses incoming request bodies before handlers
const bodyParser = require("body-parser");
const Client = require("pg").Client;
const hockeyRoute = require("./routes");

//creates express application
const app = express();

//returns middleware that only parses json and only looks at requests
//where the content-type header matches the type option
app.use(bodyParser.json());

//allows parsing for nested objects
app.use(bodyParser.urlencoded({ extended: true }));

//serves static files like images, CSS, JavaScript, etc. - in this case, the static
//files for the user interface
app.use(express.static(__dirname + "/stick-it-user-interface"));

//Identify database to connect to in postgres - the DATABASE_URL variable is stored
//in the .env file which is not uploaded to github as it contains sensitive information
//This will connect the application to the postgres database
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

//makes client object global in scope
global.client = client;

//Connect to the stickit database created in postgres
//Log database connected message to console if connection to database is successful
//Log connection error message to console if there is an error connecting to database
client
  .connect()
  .then(() => console.log("Database connected!"))
  .catch(err => console.log("error connecting to the database", err));

app.get("/", (req, res) => {
  res.send("This is the home page");
});

//allows app to use routes defined in index.js (hockeyRoute is declared above)
app.use("/", hockeyRoute);

//declares the port number to be used
const PORT = 3000;

//tells the app to listen on port 3000 and log a message to console when the server is running
app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));

module.exports = app;
