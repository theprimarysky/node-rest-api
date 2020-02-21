const express = require("express");
const tiktokRoutes = require("./server/tiktok/tiktok.route");
const instaPostRoutes = require("./server/instagram/instagram-post.route");
const authRoutes = require("./server/auth/auth.route");

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

// mount user routes at /awemes
router.use("/awemes", tiktokRoutes);

// mount user routes at /i/posts
router.use("/i/posts", instaPostRoutes);

// mount auth routes at /auth
router.use("/auth", authRoutes);

module.exports = router;
