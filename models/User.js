const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    default: [
      {
        timespan: 'All Time',
        tags: {
          Food: 0,
          Household: 0,
        }
      },
      {
        timespan: "This Month",
        tags: {
          Food: 0,
          Household: 0,
        }
      },
      {
        timespan: "This Week",
        tags: {
          Food: 0,
          Household: 0,
        }
      },
      {
        timespan: "Today",
        tags: {
          Food: 0,
          Household: 0,
        }
      }
    ]
  },
  totalExpences: {
    type: Map,
    of: String,
    default: {
      allTime: '0',
      thisMonth: '0',
      thisWeek: '0',
      today: '0'
    }
  },
  customUserTags: {
    type: Array
  }
});

module.exports = User = mongoose.model('user', UserSchema)
