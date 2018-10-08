// Users model
const User = require("../models/User");
// Login model
const Login = require("../models/Login");

const profile = require("./profile");

const registerUserInDB = (req, res, db, name, email, hash) => {
  const newUser = new User({
    name: name,
    email: email,
    tags: ["Food", "Household"]
  });

  const newLogin = new Login({
    email: email,
    hash: hash
  });

  let session = null;

  return db
    .startSession()
    .then(_session => {
      session = _session;
      // start  a transaction
      session.startTransaction();
      newLogin.save();
    })
    .then(() => {
      return newUser.save().then(user => {
        const id = user._id;
        req.params.id = id;
        profile.handleProfileGet(req, res);
      });
    })
    .then(() => {
      session.commitTransaction();
      session.endSession();
      return true;
    })
    .catch(err => {
      console.log(err);
      session.abortTransaction();
      session.endSession();
      return res.status(400).json("Unable to register");
    });
};

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password || password.length < 8) {
    return res.status(400).json("incorrect form submission");
  }

  var hash = bcrypt.hashSync(password);

  User.find({ email: email })
    .then(user => {
      if (user.length !== 0 || user[0]) {
        console.log("email not available");
        return res.status(400).json("unable to register");
      } else {
        console.log("email available");
        return registerUserInDB(req, res, db, name, email, hash);
      }
    })
    .catch(console.log);
};

module.exports = {
  handleRegister
};
