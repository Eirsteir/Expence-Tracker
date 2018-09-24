const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// LOOK INTO DATATYPES - EXPENCES CAN'T BE CORRECT?
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
  expences: {
    type: Array,
  },
  // totalExpences: {
  //   type: Map,
  //   of: Number,
  //   default: 0
  // },
  tags: {
    type: Array
  }
});

module.exports = User = mongoose.model('user', UserSchema)
