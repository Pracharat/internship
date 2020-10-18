const { Router } = require('express');
const router = Router(); // Load router
const { logger } = require('../../utils/logger');
const multer = require("multer");
const mongoose = require("mongoose");
logger.info('upload.routes loaded');
//----------------------------------post image----------------------------------------------------

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './backends/images');
  },
  filename: function(req, file, cb) {
    // cb(null, new Date().toISOString() + file.originalname);
    // cb(null, Date.now() + file.originalname);
    // cb(null, name + "-" + Date.now() + "." + ext);
    cb(null, new Date().toISOString().replace(/:|\./g,'') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Product = require("../../models/upload.model");
router.post("", upload.single('receiptFile'),  (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    filename: req.file.originalname,
    receiptFile: url + "/images/" + req.file.filename
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Created image successfully",
        resultData: {
            _id: mongoose.Types.ObjectId(result._id),
            filename: req.file.originalname,
            receiptFile: result.receiptFile
          }
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
