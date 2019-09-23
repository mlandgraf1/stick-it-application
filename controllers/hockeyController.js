//controllers handle incoming HTTP requests and send responses
//back to the caller
//import statements
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

//getAllData and getSingleData are middleware functions which are functions
//that have access to the request object(req) and response object(res)

//middleware function that will request all data from the database and receive
//all hockey sticks in database as a response or if unsuccessful, will respond with an error
const getAllData = (req, res) => {
  //This SQL query will return all sticks currently stored in the database
  client.query(`SELECT * FROM sticks`, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp.rows);
    }
  });
};

//middleware function that will request specific data stored in the database based on
//the request parameters and return the records in the database with those parameters
//if unsuccessful, it will respond with a 404 'Not Found' error 
const getSingleData = (req, res) => {
  //request parameters to be sent in a SQL query
  const { flex, curve, ageLevel, price } = req.params;
  //SQL query to be sent with parameters flex, curve, ageLevel, price
  client.query(
    `SELECT * FROM sticks WHERE flex::text like '%${flex}%' AND curve::text like '%${curve}%' AND ageLevel::text like '%${ageLevel}%' AND price < ${price}`,
    (err, resp) => {
      if (err) {
        res.send({ error: err });
      }else if(!resp.rows.length){
        res.status(404).send({errorMsg: "No stick was found matching your criteria. Please try again."});
      } else {
        res.send(resp.rows);
      }
    }
  );
};

module.exports.getAllData = getAllData;
module.exports.getSingleData = getSingleData;
