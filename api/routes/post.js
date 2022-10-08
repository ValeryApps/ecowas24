const express = require("express");
const {
  createPost,
  fetchPosts,
  fetchPostsBySlug,
} = require("../controllers/post");
const { auth } = require("../middlewares/auth");

const router = express.Router();
router.post("/posts/create", auth, createPost);
router.get("/posts", fetchPosts);
router.get("/posts/:slug", fetchPostsBySlug);
router.get("/posts/country/:countryName", fetchPostsBySlug);

module.exports = router;
