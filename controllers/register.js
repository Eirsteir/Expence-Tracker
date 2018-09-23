// Item model
const Item = require('../models/Item');

const handleRegister = (req, res, bcrypt) => {
  const { email, name, password } = req.body;

  const newItem = new Item({
    name: name,
    email: email,
    password: password
  });

  newItem.save().then(user => res.json(user));

}

module.exports = {
  handleRegister
}
