const express = require("express");
const router = express.Router();
const {
  registerUser,
  authuser,
  allUsers,
} = require("../controllers/userControllers");

const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", authuser);
router.get("/", protect, allUsers);

module.exports = router;
