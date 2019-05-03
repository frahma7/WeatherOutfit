// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var ClothingSchema = new mongoose.Schema({
    article: {
      type: String,
      required: [true, "Article required"]
    },

    minTemp: {
      type: Number,
      required: [true, "min required"]
    },
    
    maxTemp: {
      type: Number,
      required: [true, "max required"]
    },

    gender: {
      type: String,
      required: [true, "gender required"]
    },

    assignedUserName: {
      type: String,
      default: "unassigned"
    },

    dateCreated: {
      type: Date,
      default: Date.now
    }
});
// Export the Mongoose model
module.exports = mongoose.model('Clothing', ClothingSchema);
