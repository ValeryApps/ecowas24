const Post = require("../models/Post");

exports.likePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post does not exist" });
    }
    if (!post.likes.includes(userId)) {
      console.log("no like");
      await post.updateOne({
        $push: {
          likes: userId,
        },
      });
      await post.updateOne({
        $pull: {
          dislikes: userId,
        },
      });
    } else {
      await post.updateOne({
        $pull: {
          likes: userId,
        },
      });
    }
    return res.json(post);
  } catch (error) {}
};

exports.dislikePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Post does not exist" });
    }
    if (!post.dislikes.includes(userId)) {
      await post.updateOne({
        $push: {
          dislikes: userId,
        },
      });
      await post.updateOne({
        $pull: {
          likes: userId,
        },
      });
    } else {
      await post.updateOne({
        $pull: {
          dislikes: userId,
        },
      });
    }
    return res.json(post);
  } catch (error) {}
};
