// Login model
const Login = require('../models/Login');
// Users model
const User = require('../models/User');

const handleSignin = (req, res, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json('incorrect form submission')
  }

  Login.find({ email: email })
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash); // returns true if correct credentials
      if (isValid) {
        return User.find({ email: email })
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json('Unable to get user'))
      } else {
        return res.status(400).json('wrong email or password')
      }
  })
  .catch(console.log)

}

module.exports = {
  handleSignin
}
