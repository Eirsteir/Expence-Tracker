// Users model
const User = require('../models/User');
// Login model
const Login = require('../models/Login');

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission')
  } // else if (password.lenght < 8)

  var hash = bcrypt.hashSync(password);

  const newUser = new User({
    name: name,
    email: email,
  });


  const newLogin = new Login({
    email: email,
    hash: hash
  });

  let session = null;
  return db.startSession()
  .then(_session => {
    session = _session;
    // start  a transaction
    session.startTransaction()
    return newUser.save()
      .then(user => res.json(user))
  })
  .then(() => {
    return newLogin.save()
  })
    .then(() => {
      session.commitTransaction();
      session.endSession();
      return true
    })
    .catch(err => {
      console.log(err);
      session.abortTransaction();
      session.endSession();
      return res.status(400).json('Unable to register')
    })

}

module.exports = {
  handleRegister
}
