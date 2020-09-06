const router = require("express").Router();
const multer = require("multer");
const UploadPhoto = require("../models/photoDetails");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "media/photos/");
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

router.post("/uploadPhoto", upload.single("file"), (req, res, next) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var minute = today.getMinutes();
  var hour = today.getHours();

  today = mm + "/" + dd + "/" + yyyy + "-" + hour + ":" + minute;

  const UploadPhotos = new UploadPhoto({
    photo_title: req.file.filename.replace(/ /g, "_"),
    photo_path:
    "http://localhost:5000/api/photos/" + req.file.filename.replace(/ /g, "_"),
    photo_date: today,
  });
  UploadPhotos.save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(200).json({
    message: "Upload Successful",
  });
});

module.exports = router;
