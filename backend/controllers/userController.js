const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const sendEmail = require("../nodeMailer/sendEmail");

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    await sendEmail("VERIFY", email, user._id);
    res.status(201).json({ user });
  } else {
    res.status(400);
    throw new Error("Failed to create a user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    res.status(400);
    throw new Error("please enter all the fields");
  }

  const user = await User.findOne({
    email,
    emailVerifyToken: token,
    emailVerifyTokenExpiry: { $gt: Date.now() },
  });

  if (user) {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      res.status(400);
      throw new Error("Incorrect Password");
    }
    user.isVerified = true;
    user.emailVerifyToken = null;
    user.emailVerifyTokenExpiry = null;
    await user.save();

    const token = user.createJwt();

    res.status(200).json({ user, token });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

module.exports = { signupUser, loginUser };
