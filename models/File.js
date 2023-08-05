const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  //   likes: [{ type: Schema.Types.ObjectId, ref: "omninose" }],
  //   comments: [
  //     {
  //       user: { type: Schema.Types.ObjectId, ref: "omninose" },
  //       text: { type: String, required: true },
  //     },
  //   ],
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
