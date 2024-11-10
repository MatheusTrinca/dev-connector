const mongoose = require('mongoose');

const checkObjectId = idToCheck => (req, res, next) => {
  console.log(req.params);
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) {
    return res.stauts(400).json({ msg: 'Invalid ID' });
  }

  next();
};

module.exports = checkObjectId;
