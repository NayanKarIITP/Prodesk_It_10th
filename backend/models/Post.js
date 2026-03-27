const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // URL from Cloudinary
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This must match your User model name exactly
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);