const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/Auth");
const { auth } = require("../middlewears/auth");
router.post("/signup", signup);
router.post("/login", login);

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route for test",
  });
});
module.exports = router;
