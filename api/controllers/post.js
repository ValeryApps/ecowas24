const Post = require("../models/Post");
exports.createPost = async (req, res) => {
  const { title, body, type, images, author, externUrl, category, country } =
    req.body;
  const mySlug = title.replaceAll(" ", "-");
  try {
    const post = await new Post({
      title,
      slug: mySlug,
      body,
      type,
      images,
      author,
      externUrl,
      category,
      country,
    }).save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      // .populate({
      //   path: "comments",
      //   populate: { path: "commentBy" },
      // })
      .sort({ createdAt: -1 });
    // console.log(posts);
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.fetchPostsBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug }).populate({
      path: "comments",
      populate: { path: "commentBy" },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
