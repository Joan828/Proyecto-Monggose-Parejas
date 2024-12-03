const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication, isAuthor } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication,PostController.create)
router.delete("/id/:_id", authentication,PostController.delete)
router.put("/id/:_id", authentication,PostController.update)
router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)
router.get("/getAllPosts", PostController.getAllPosts)


module.exports = router