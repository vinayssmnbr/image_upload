const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      console.log(payload);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "somethins is wrong ,while verify the token",
    });
  }
};
