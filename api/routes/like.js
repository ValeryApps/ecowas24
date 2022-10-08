const express = require("express");
const { likePost, dislikePost } = require("../controllers/like");
const { loggedIn } = require("../middlewares/auth");
const router = express.Router();

router.post("/like", loggedIn, likePost);
router.post("/dislike", loggedIn, dislikePost);

module.exports = router;
