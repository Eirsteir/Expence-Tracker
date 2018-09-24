// Users model
const User = require('../models/User');

const handleAddCustomTag = (req, res) => {
  const { _id, tag } = req.body;

  User.findOneAndUpdate(
    { _id: _id },
    { $push: { tags: tag }},
    { new: true } // return modified user
  )
  .then(user => {
    res.json(user.tags);
  })
  .catch(err => {
    res.status(400).json('unable to add tag');
  })
}

module.exports = {
  handleAddCustomTag
}
