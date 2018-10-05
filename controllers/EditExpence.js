// Users model
const User = require("../models/User");
const profile = require("./profile");

const handleEditExpence = (req, res, db) => {
  console.time("putRequestExpence");
  const { user_id, expence_id, amount } = req.body;
  console.log(user_id, expence_id, amount);

  return User.findOneAndUpdate(
    { _id: user_id, "expences._id": expence_id },
    { $set: { "expences.$.amount": amount } },
    { new: true } // return modified user
  )
    .then(user => {
      const id = user._id;
      req.params.id = id;
      profile.handleProfileGet(req, res);
    })
    .catch(console.log);
};
module.exports = {
  handleEditExpence
};

// consider querying without user_id
