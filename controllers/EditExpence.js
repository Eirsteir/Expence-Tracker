// Users model
const User = require("../models/User");

const handleEditExpence = (req, res, db) => {
  console.time("putRequestExpence");
  const { user_id, expence_id, amount } = req.body;
  console.log(user_id, expence_id, amount);

  return User.findOneAndUpdate(
    { _id: user_id, "expences._id": expence_id },
    { $set: { "expences.$.amount": amount } },
    { new: true }, // return modified user
    (err, response) => {
      if (err) {
        console.log("Error: ", err);
        return res.status(400).json(err);
      } else {
        console.log("success: ", response);
        console.timeEnd("putRequestExpence");
        return res.json(response);
      }
    }
  );
};
module.exports = {
  handleEditExpence
};

// consider querying without user_id
