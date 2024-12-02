const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)

module.exports = router