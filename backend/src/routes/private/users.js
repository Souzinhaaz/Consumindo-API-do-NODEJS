const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController")
const authMiddleware = require("../../middlewares/authMiddleware")

router.get("/", authMiddleware.verifyToken, userController.getPosts)



module.exports = router;