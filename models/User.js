const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // followers: [{ type: Schema.Types.ObjectId, ref: "omninose" }],
  // following: [{ type: Schema.Types.ObjectId, ref: "omninose" }],
});

module.exports = mongoose.model("omninose", userSchema);
