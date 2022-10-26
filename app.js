const express = require("express");
const bodyParser = require('body-parser');
const { format } = require("timeago.js");
const { rateLimit } = require("express-rate-limit");


const app = express();

//default middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))


//request limiter function
const limitRequest = rateLimit({
    windowMs: 1000,
    max: 3,
    message: "Try again after one second",
    statusCode: 429
  });


//api middlewares
app.get("/howold", limitRequest, (req, res, next) => {

    try {

      const dob = req.query.dob;

      if (dob === undefined || dob === "") {
        return res.status(400).send("Please add a valid query parameter");
      }
  
     //format to standard
      const firstDate = dob.split(" ")[0];
      const secondDate = dob.split(" ")[1];

      const finalDate = `${firstDate} + ${secondDate}`;
  
      // check for valid inputs
      if (new Date(finalDate).toString() === "Invalid Date") {
        let error = new Error("Invalid Date format");
        error.statusCode = 400;
        throw error;
      }
  
      const timestamp = format(finalDate);
      res.status(200).send(timestamp);
    } catch (err) {
      next(err);
    }
  });


//error handler middleware
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data, })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT} ....`)
})