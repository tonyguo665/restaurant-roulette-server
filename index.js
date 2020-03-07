const express = require("express");
const axios = require("axios")
require("dotenv").config();

let cors = require("cors");
const morgan = require("morgan");
const parser = require("body-parser");

const app = express();
app.set("port", process.env.PORT || 3001);

app.use(cors());
app.use(morgan("dev"));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get("/", (req,res)=>{
  axios.get("https://api.yelp.com/v3/businesses/search",{
    headers:{
      Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
    },
    params:req.query
  })
  .then((results)=>{
    res.send(results.data.businesses)
  })
  .catch((err)=>{
    console.log(err)
  })
});

app.listen(app.get("port"), () => {
  console.log("Listening on", app.get("port"));
});