const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  photo_title: { type: String, required: true },
  photo_path: { type: String, required: true },
  photo_date: { type: Date, required: true }
});

module.exports = mongoose.model("UploadPhoto", uploadSchema);
