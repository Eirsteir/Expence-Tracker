// Users model
const User = require("../models/User");
const profile = require("./profile");

const handleDeleteExpence = (req, res) => {
  const { user_id, expence_id } = req.body;

  return User.findOneAndUpdate(
    { _id: user_id, "expences._id": expence_id },
    { $pull: { expences: { _id: [expence_id] } } },
    { new: true } // return modified user
  )
    .then(user => {
      const id = user._id;
      req.params.id = id;
      profile.handleProfileGet(req, res);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};
module.exports = {
  handleDeleteExpence
};
