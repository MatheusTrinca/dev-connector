const express = require('express');
const Profile = require('../../models/Profile');
const auth = require('../../middlewares/auth');
const { check } = require('express-validator');

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
  ],
  async (req, res) => {
    return res.send('test');
  }
);

module.exports = router;
