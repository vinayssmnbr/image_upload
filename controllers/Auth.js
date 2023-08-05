const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser || existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Email or Username Already exist",
      });
    }
    //SECURE PASSWORD
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error in hashing Password",
      });
    }

    //CREATE ENTRY FOR USER
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    user.save();
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "incorrect email or password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User are not registered",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "loggin success",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "password Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "login failed",
    });
  }
};
