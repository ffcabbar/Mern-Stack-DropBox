const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  file_name: { type: String, required: true },
  file_path: { type: String, required: true },
  file_destination: { type: String, required: true },
});

module.exports = Upload = mongoose.model("Upload", uploadSchema);
