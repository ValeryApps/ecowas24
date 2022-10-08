const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  let temp = req.header("Authorization");
  const token = temp ? temp.slice(7) : "";
  try {
    if (!token) {
      return res
        .status(400)
        .json({ message: "No token provided for authentication" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Token provided is not valid" });
      }
      if (!user.isAdmin && !user.isModerator) {
        return res
          .status(400)
          .json({ message: "You are not authorized to create a post" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.loggedIn = async (req, res, next) => {
  let temp = req.header("Authorization");
  const token = temp ? temp.slice(7) : "";
  try {
    if (!token) {
      return res.status(400).json({ message: "You should sign in before" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Token provided is not valid" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
