// Login model
const Login = require('../models/Login');

const handleSignin = (req, res, bcrypt) => {
  const { email, name, password } = req.body;

  Login.find({ email: email, hash: hash})
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
