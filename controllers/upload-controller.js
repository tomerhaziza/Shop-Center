const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');

// Multer file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Uploaded pictures path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Uploaded pictures new name format
    }
})

const fileFilter = (req, file, cb) => {
    // Accept only JPEG and PNG files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

// Picture upload API
router.post("/", upload.single('image'), async (req, res, next) => {
res.json(req.file);
})

// Delete the old picture if admin changed product picture
router.delete("/delete/:id", async (req, res, next) => {
    const imageName = req.params.id;
    const path = './uploads/' + imageName;

    fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          throw new ServerError(ErrorType.GENERAL_ERROR);
        }
      res.json()
      })
})

module.exports = router