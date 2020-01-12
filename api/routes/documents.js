const express = require("express");
const router = express.Router();
const multer = require('multer');
const documentController = require('../controllers/document');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
      cb(null, true);

    // reject a file
    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //   cb(null, true);
    // } else {
    //   cb(null, false);
    // }
  };
  
  const upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: fileFilter
  });

router.post("/uploadDocument", upload.single('documentFile'), documentController.uploadDocument);

module.exports = router;
