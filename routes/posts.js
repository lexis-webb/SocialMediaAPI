const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post has been updated");
    } else {
      res.status(403).json("you can only update your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json(" post has been deleted");
    } else {
      res.status(403).json("you can only delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("You have liked this post");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("You disliked this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

//get timeline posts

router.get("/timeline/all", async (req, res) => {
    try {
      const { userId } = req.body;
      const currentUser = await User.findById(userId);
  
      if (!currentUser) return res.status(404).json({ message: "User not found" });
  
      // Fetch posts from the current user and their followings
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Post.find({ userId: { $in: currentUser.followings } });
  
      res.json([...userPosts, ...friendPosts]);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;