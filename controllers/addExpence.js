// Users model
const User = require('../models/User');

const handleAddExpence = (req, res) => {
  const { _id, tag, amount } = req.body;
  if ( !_id || !tag || !amount ) {
    return res.status(400).json('Wrong form submission');
  }

  const newExpence = {
    timestamp: new Date(),
    tag: tag,
    amount: amount
  }

  // Find user and update corresponding tag with the given value and return the modified user document
  User.findOneAndUpdate(
    { _id: _id },
    { $push: { expences: newExpence }},
    { new: true } // return modified user
  )
  .then(user => {
    res.json(user)
  })
  .catch(err => {
    res.status(400).json('unable to add expence')
  })

}

module.exports = {
  handleAddExpence
}
