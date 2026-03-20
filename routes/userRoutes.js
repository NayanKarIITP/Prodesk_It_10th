const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ CREATE USER
router.post("/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;