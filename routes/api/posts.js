const express = require('express');
const auth = require('../../middlewares/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');
const router = express.Router();

// @route   GET api/posts
// @desc    Create a post
// @access  Private
router.get('/', auth, check('text', 'Text is required'), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      user: req.user.id,
      name: user.name,
      text: req.body.text,
      avatar: user.avatar,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// TODO: TEST THIS CREATE POST ROUTE

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private

module.exports = router;
