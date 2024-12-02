const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.get("/getPostById/:_id", PostController.getPostById)

module.exports = router