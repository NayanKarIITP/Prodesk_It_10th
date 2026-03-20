const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");


// ✅ CREATE POST
router.post("/posts", async (req, res) => {
    try {
        const { title, content, authorId } = req.body;

        const post = await Post.create({
            title,
            content,
            authorId
        });

        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ GET ALL POSTS (WITH POPULATE 🔥)
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("authorId", "name email"); // 🔥

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ DELETE POST
router.delete("/posts/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ✅ TOP 3 MOST RECENT POSTS (AGGREGATION 🔥🔥)
router.get("/posts/top3", async (req, res) => {
    try {
        const posts = await Post.aggregate([
            { $sort: { createdAt: -1 } }, // newest first
            { $limit: 3 }
        ]);

        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;