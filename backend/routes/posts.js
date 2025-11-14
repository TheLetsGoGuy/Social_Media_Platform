const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const Post = require("../models/Post");
const User = require("../models/User");

// create post (image optional)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text && !req.file)
      return res.status(400).json({ msg: "Post must have text or image" });
    const user = await User.findById(req.user.id);
    const newPost = new Post({
      user: user.id,
      userName: user.name,
      text: text || null,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// get timeline (all posts)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(200);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
