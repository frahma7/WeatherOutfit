const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Clothing = require('./clothingSchema');


const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb+srv://frahma7:helloWorld1@finalproject-q61c3.mongodb.net/test?retryWrites=true";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/get", (req, res) => {
  var rWhere = req.query.where ? JSON.parse(req.query.where) : null;
  Clothing.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  }).where(rWhere);
});

function createSchema(request){
   var clothingSchema = new Clothing({
    name: request.body.name,
    article: request.body.article,
    minTemp: request.body.minTemp,
    maxTemp: request.body.maxTemp,
    gender: request.body.gender,
    reference: request.body.reference,
  });

  return clothingSchema;
}


// post
// this method overwrites existing data in our database
router.post("/post", (req, res) => {
  Clothing.create(createSchema(req), (error, clothings) => {
    if (error) return res.json({ success: false, error: error });
    return res.json({ success: true, data: clothings });
  });
});


// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
