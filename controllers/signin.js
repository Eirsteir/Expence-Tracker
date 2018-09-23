// Item model
const Item = require('../models/Item');

const handleSignin = (req, res, bcrypt) => {
  const { email, name, password } = req.body;

  Item.find({ email: email, password: password})
    .then(user => {
      console.log(user[0]);
      if (user[0] && user[0].id) {
        res.json(user[0]);
      } else {
        res.status(400).json('Error signin in');
      }
    })
    .catch(err => {
      console.log(err);
    })

}

module.exports = {
  handleSignin
}
