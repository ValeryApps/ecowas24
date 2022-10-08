const express = require("express");
const { upload, getImages } = require("../controllers/uploadController");
const { uploadImage } = require("../middlewares/uploadImage");
const { auth, loggedIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/upload", loggedIn, uploadImage, upload);
router.post("/images", loggedIn, getImages);

module.exports = router;
