const router = require("express").Router();
const multer = require("multer");
const Upload = require("../models/videoDetails");

const thumbnailGenerator = require("../helpers/videoThumbnail");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, "_"));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50, //50 MB
  },
});

router.post("/uploadVideo", upload.single("file"), (req, res, next) => {
  thumbnailGenerator.generateThumbnail(
    // /api/videos is made publically available in App.js
    "http://localhost:5000/api/videos/" + req.file.filename.replace(/ /g, "_"),
    req.file.filename.replace(/ /g, "_")
  );

  res.status(200).json({
    message: "Upload Successful",
  });
});

module.exports = router;
