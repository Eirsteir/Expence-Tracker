// Users model
const User = require('../models/User');

const handleProfileGet = (req, res) => {
  const { id } = req.params;
  console.log(id);
  return User.find({ _id: id })
    .then(user => {
      console.log(user);
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
   .catch(err => res.status(400).json('Error getting user'))
}

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
  handleProfileGet,
  // handleProfileUpdate
}
