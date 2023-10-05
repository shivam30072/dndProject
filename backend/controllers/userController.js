const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const sendEmail = require("../nodeMailer/sendEmail");

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ type: "error", message: "All fields are mandatory" });
    throw new Error("please enter all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ type: "error", message: "User already exists" });
    throw new Error("User already exists");
  }

  if (!userExists) {
    const user = await User.create({ name, email, password });
    const response = await sendEmail("VERIFY", email, user._id);
    if (response) {
      res.status(201).json({
        user,
        type: "success",
        message: "A verification token has been sent to your email ID",
      });
      return;
    }
    /* removing user because couldn't sent the verification token via mail and currently 
    don't have the feature that user can verify his emailId later in the application so 
    have to remove now */
    const RemoveUser = await User.findByIdAndDelete({
      _id: user._id,
    });
    res.status(400).json({
      type: "error",
      message: "Error Occured, Try again",
    });
  } else {
    res.status(400).json({ type: "error", message: "Error occured" });
    throw new Error("Failed to create a user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    res
      .status(400)
      .json({ type: "error", message: "please enter all the fields" });
  }

  if (token === "12345678") {
    const user = await User.findOne({
      email,
      isVerified: true,
      emailVerifyToken: null,
      emailVerifyTokenExpiry: null,
    });
    if (user) {
      // const isPasswordCorrect = await user.comparePassword(password);
      const isPasswordCorrect = await User.findOne({ password });
      if (!isPasswordCorrect) {
        console.log(isPasswordCorrect);
        res.status(400).json({ type: "error", message: "Incorrect Password" });
        return;
      }
      const token = user.createJwt();

      res.status(200).json({ user, token });
    } else {
      res.status(400).json({ type: "error", message: "User Not Found" });
    }
  } else {
    const user = await User.findOne({
      email,
      emailVerifyToken: token,
      emailVerifyTokenExpiry: { $gt: Date.now() },
    });

    if (user) {
      // const isPasswordCorrect = await user.comparePassword(password);
      const isPasswordCorrect = await User.findOne({ password });

      if (!isPasswordCorrect) {
        res.status(400).json({ type: "error", message: "Incorrect Password" });
        return;
      }
      user.isVerified = true;
      user.emailVerifyToken = null;
      user.emailVerifyTokenExpiry = null;
      await user.save();

      const token = user.createJwt();

      res.status(200).json({ user, token });
    } else {
      res.status(400).json({ type: "error", message: "User Not Found" });
    }
  }
});

module.exports = { signupUser, loginUser };
