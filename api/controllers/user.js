const {
  validateEmail,
  validateLength,
  generateUsername,
} = require("../helpers/validate");
const { generateToken } = require("../helpers/token");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { first_name, last_name, password, email } = req.body;

  try {
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Email not valid" });
    }
    if (!validateLength(password, 6, 15)) {
      return res.status(400).json({
        message: "Password should be between 6 and 15 character long",
      });
    }
    const email_exist = await User.findOne({ email });
    if (email_exist) {
      return res.status(400).json({
        message: "This is email is already taken. Please try another one",
      });
    }
    const username = await generateUsername(first_name + last_name);
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await new User({
      first_name,
      last_name,
      password: hashedPassword,
      email,
      username,
    }).save();
    const token = generateToken({ id: user._id }, "7d");
    const email_url = `${process.env.BASE_URL}/activate/${token}`;
    // await sendVerificationEmail(user.email, user.first_name, email_url);
    return res.json({
      userId: user._id,
      username: user.username,
      first_name,
      last_name,
      picture: user.picture,
      email,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "This email is not connected to any account",
      });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(
      { id: user._id, isAdmin: user.isAdmin, isModerator: user.isModerator },
      "7d"
    );
    return res.json({
      userId: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      picture: user.picture,
      email,
      verified: user.verified,
      savedPosts: user.savedPosts,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
