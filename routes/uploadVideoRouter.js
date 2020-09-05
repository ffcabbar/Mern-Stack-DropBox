const router = require("express").Router();
const multer = require("multer");
const Upload = require("../models/videoDetails");

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
  console.log(req.file);
  res.status(200).json({
    message: "Upload Successful",
  });
  const newItem = new Upload({
    file_name: req.file.originalname,
    file_path: req.file.path,
    file_destination: req.file.destination,
  });
  const savedItem = newItem.save();
  res.json(savedItem);
});

module.exports = router;
