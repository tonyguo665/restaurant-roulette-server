const express = require("express");
const axios = require("axios")
require("dotenv").config();
// const db = require("./express-server/db/sequelize-init.js");
// Middleware
let cors = require("cors");
const morgan = require("morgan");
const parser = require("body-parser");
// Router
const router = require("./routes");
// Server Instantiation
const app = express();
app.set("port", process.env.PORT || 3001);

// Logging and parsing
app.use(cors());
app.use(morgan("dev"));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
// Set up our routes
app.get("/", (req,res)=>{
  axios.get("https://api.yelp.com/v3/businesses/search",{
    headers:{
      Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params:req.query
  })
  .then((results)=>{
    console.log(results)
    res.send(results.data.businesses)
  })
  .catch((err)=>{
    console.log(err)
  })
});

app.listen(app.get("port"), () => {
  console.log("Listening on", app.get("port"));
});