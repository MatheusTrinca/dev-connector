const express = require("express");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middlewares/auth");
const { check, validationResult } = require("express-validator");
const normalize = require("normalize-url");

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    check("status", "Status is required").notEmpty(),
    check("skills", "Skills is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ""
          ? normalize(website, { forceHttps: true })
          : "",
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map(skill => " " + skill.trim()),
      ...rest,
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["avatar", "name"]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["avatar", "name"]);

    if (!profile) {
      res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.send(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile/user/:user_id
// @desc    Delete Profile, Users and Posts
// @access  Private
router.delete("/user/:user_id", async (req, res) => {
  try {
    // TODO: remove all posts

    // Remove profile
    await Profile.findOneAndDelete({ user: req.params.user_id });

    // Remove user
    await User.findOneAndDelete({ user: req.params.user_id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
