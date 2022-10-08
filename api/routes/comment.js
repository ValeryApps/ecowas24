const express = require("express");
const { comment, getComments } = require("../controllers/comment");
const { auth, loggedIn } = require("../middlewares/auth");

const router = express.Router();
router.post("/comment", loggedIn, comment);
router.get("/comment/:postId", getComments);

module.exports = router;
