const handleSignin = (req, res, db, bcrypt) => {
  console.log(db.users[0]);
  if (req.body.email === db.users[0].email && req.body.password === db.users[0].password) {
    res.json(db.users[0])
  } else {
    res.status(400).json('Error logging in')
  }
}

module.exports = {
  handleSignin
}
