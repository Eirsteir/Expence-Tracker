// Users model
const User = require("../models/User");
const axios = require("axios");

const handleProfileGet = (req, res) => {
  const { id } = req.params;
  console.log(id);
  User.find({ _id: id })
    .lean() // turns into plain js array
    .then(user => {
      console.log("profile: ", user);
      if (user.length) {
        axios
          .post(
            "https://364y5aap1g.execute-api.eu-west-2.amazonaws.com/dev/sort-data",
            {
              expences: user[0].expences
            }
          )
          .then(response => {
            if (response.data.input) {
              user[0].expences = response.data.input;
              res.json(user[0]);
            } else {
              res.status(400).json("unable to sort expences");
            }
          })
          .catch(err => console.log(err));
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch(err => res.status(400).json("Error getting user"));
};

// const handleProfileUpdate = (req, res, db) => {
//   // beware security: never trust user input
//   const { id } = req.params;
//   const { name, age, pet } = req.body.formInput;
//   db('users')
//     .where({ id })
//     .update({ name, age, pet })
//     .then(response => {
//       if (response) {
//         res.json('Successfully updated profile')
//       } else {
//         res.status(400).json('Unable to update')
//       }
//     })
//     .catch(err => res.status(400).json('Error updating user'))
// }

module.exports = {
  handleProfileGet
  // handleProfileUpdate
};
