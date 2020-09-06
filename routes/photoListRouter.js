const express = require("express");
const router = express.Router();

const UploadPhoto = require("../models/photoDetails");

router.get("/photoList", (req, res, next) => {
  UploadPhoto.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
