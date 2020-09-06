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
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var minute = today.getMinutes();
  var hour = today.getHours();

  today = mm + "/" + dd + "/" + yyyy + "-" + hour + ":" + minute;

  thumbnailGenerator.generateThumbnail(
    // /api/videos is made publically available in App.js
    "http://localhost:5000/api/videos/" + req.file.filename.replace(/ /g, "_"),
    req.file.filename.replace(/ /g, "_"), today
  );

  res.status(200).json({
    message: "Upload Successful",
  });
});

module.exports = router;
