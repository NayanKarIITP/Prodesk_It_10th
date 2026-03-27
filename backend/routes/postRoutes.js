const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const upload = require("../middleware/upload");

// ✅ CREATE POST (CRUD + Multer + Cloudinary)
router.post("/posts", upload.single("image"), async (req, res) => {
    try {
        const { title, content, authorId } = req.body;

        // Check if file exists to avoid "cannot read property 'path' of undefined"
        const imageUrl = req.file ? req.file.path : null;

        const post = await Post.create({
            title,
            content,
            authorId, // Ensure the frontend sends a real 24-char MongoDB ID
            image: imageUrl
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ GET ALL POSTS (Populate Relationship)
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("authorId", "name email") // Joins User data
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ TOP 3 RECENT POSTS (Advanced Aggregation)
router.get("/posts/top3", async (req, res) => {
    try {
        const posts = await Post.aggregate([
            { $sort: { createdAt: -1 } }, 
            { $limit: 3 },
            {
                $lookup: {
                    from: "users",           // The actual collection name in MongoDB (usually lowercase plural)
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            },
            { $unwind: "$author" } // Converts author array to an object
        ]);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  DELETE POST
router.delete("/posts/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;