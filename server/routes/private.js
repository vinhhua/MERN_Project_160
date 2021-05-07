const express = require("express");
const router = express.Router();
const { getPrivateRoute } = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getPrivateRoute);
router.route("/spending").get(protect, getPrivateRoute)
router.route("/todo").get(protect, getPrivateRoute)

module.exports = router;