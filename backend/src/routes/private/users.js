const express = require("express");
const router = express.Router();
const userController = require("../../controllers/authController")
const authMiddleware = require("../../middlewares/authMiddleware")

router.get("/", authMiddleware.verifyToken, userController.getUser)



module.exports = router;