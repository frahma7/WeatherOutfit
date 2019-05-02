// Load required packages
var mongoose = require('mongoose');

// Define our user schema
let Schema = mongoose.Schema;
const clothingSchema = new Schema({
    name: {
      type: String,
      required: true
    }
    // article: {
    //   type: String,
    //   required: [true, "Article required"]
    // },
    // minTemp: {
    //   type: Number,
    //   required: [true, "min required"]
    // },
    // maxTemp: {
    //   type: Number,
    //   required: [true, "max required"]
    // },
    // gender: {
    //   type: String,
    //   required: [true, "gender required"]
    // },
    // assignedUserName: {
    //   type: String,
    //   default: "unassigned"
    // },
    // dateCreated: {
    //   type: Date,
    //   default: Date.now
    // }
});

// Export the Mongoose model
const Clothing = mongoose.model('Clothing', clothingSchema);
module.exports = Clothing;
