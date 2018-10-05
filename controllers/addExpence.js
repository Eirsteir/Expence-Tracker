// Users model
const User = require("../models/User");
const profile = require("./profile");

const ObjectID = require("mongodb").ObjectID;

const handleAddExpence = (req, res) => {
  const { _id, tag, amount } = req.body;
  if (!_id || !tag || !amount) {
    return res.status(400).json("Wrong form submission");
  }

  const newExpence = {
    timestamp: new Date(),
    tag: tag,
    amount: amount,
    _id: new ObjectID()
  };

  // Find user and update corresponding tag with the given value and return the modified user document
  User.findOneAndUpdate(
    { _id: _id },
    { $push: { expences: newExpence } },
    { new: true } // return modified user
  )
    .then(user => {
      const id = user._id;
      req.params.id = id;
      profile.handleProfileGet(req, res);
    })
    .catch(err => {
      res.status(400).json("unable to add expence");
    });
};

module.exports = {
  handleAddExpence
};
