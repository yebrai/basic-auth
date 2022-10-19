const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRoutes = require ("./auth.routes.js")
router.use("/auth", authRoutes)

// Tambien puede añadirse de esta forma:

//const profileRoutes = require ("./profile.routes")
router.use("/profile", require ("./profile.routes"))

module.exports = router;
