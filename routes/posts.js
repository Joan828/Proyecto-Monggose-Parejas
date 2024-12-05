const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication, isAuthor } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication,PostController.create)
router.delete("/id/:_id", authentication, isAuthor, PostController.delete)
router.put("/id/:_id", authentication, isAuthor, PostController.update)
router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)
router.get("/getAllPosts", PostController.getAllPosts)
router.get("/getAllPostsAndUsers", authentication, PostController.getAllPostsAndUsers)
router.get("/getInfo", authentication, PostController.getInfo)
router.put('/like/:_id', authentication, PostController.like)
router.put('/unlike/:_id', authentication, PostController.unLike)


module.exports = router