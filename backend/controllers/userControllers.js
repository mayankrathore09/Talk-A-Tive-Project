const User = require("../models/UserModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please fill all the fields",
    });
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res.status(400).json({
      success: false,
      message: "user already existed",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    pic,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  }

  return res.status(400).json({
    message: "User not found",
  });
});

const authuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "all fields required",
    });
  }

  const user = await User.findOne({ email });

  const checkpassword = await bcrypt.compare(password, user.password);

  if (user && checkpassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authuser, allUsers };
