const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  // Look up options for null

  db.users.push({
    id: '123',
    name: name,
    email: email,
    password: password,
    joined: new Date()
  });

  res.json(db.users[db.users.length -1]);
}

module.exports = {
  handleRegister
}
