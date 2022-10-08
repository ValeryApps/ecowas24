const express = require("express");
const { reply, getReplies } = require("../controllers/reply");
const { loggedIn } = require("../middlewares/auth");

const router = express.Router();
router.post("/reply", loggedIn, reply);
router.get("/reply/:commentId", getReplies);

module.exports = router;
