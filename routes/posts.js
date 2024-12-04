const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()

router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)
router.get("/getAllPosts", PostController.getAllPosts)
router.get("/getAllPostsAndUsers", authentication, PostController.getAllPostsAndUsers)
router.get("/getInfo", authentication, PostController.getInfo)
router.post("/create", authentication, PostController.create)
router.delete("/id/:_id",PostController.delete)
router.put("/id/:_id",PostController.update)
router.put('/like/:_id', authentication, PostController.like);


module.exports = router