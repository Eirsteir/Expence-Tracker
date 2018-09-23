const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LoginSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});

module.exports = Login = mongoose.model('login', LoginSchema);
