// Load required packages
var mongoose = require('mongoose');

// Define our user schema
let Schema = mongoose.Schema;
const clothingSchema = new Schema({
    //sweater, pants, shirts, shorts, skirts, boots, shoes
    name: {
      type: String,
      required: true
    },
    //top, bottom, shoes
    article: {
      type: String,
      required: [true, "Article required"]
    },
    //winter -100
    //spring/fall 50
    //summer 75
    minTemp: {
      type: Number,
      required: [true, "min required"]
    },
    //winter 50
    //spring/fall 75
    //summer 200
    maxTemp: {
      type: Number,
      required: [true, "max required"]
    },
    //male, female
    gender: {
      type: String,
      required: [true, "gender required"]
    },
    // assignedUserName: {
    //   type: String,
    //   default: "unassigned"
    // },
    //link to google drive
    reference: {
      type: String,
      require: true
    },
    dateCreated: {
      type: Date,
      default: Date.now
    }
});

// Export the Mongoose model
const Clothing = mongoose.model('Clothing', clothingSchema);
module.exports = Clothing;
