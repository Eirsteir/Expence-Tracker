const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  joined: {
    type: Date,
    default: Date.now
  },
  age: {
    type: Number,
    min: 0,
    max: 150
  },
  expences: [
    {
      timestamp: Date,
      tag: String,
      amount: Number,
      _id: ObjectId
    }
  ],
  tags: {
    type: Array
  }
});

module.exports = User = mongoose.model("user", UserSchema);
