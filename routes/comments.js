const express = require("express")
const CommentController = require("../controllers/CommentController")
const { authentication, isAuthor } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication, CommentController.create)

module.exports = router