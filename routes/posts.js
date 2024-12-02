const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.get("/getPostById/:_id", PostController.getPostById)
router.get("/getPostByTitle/:title", PostController.getPostByTitle)
router.get("/getAllPosts", PostController.getAllPosts)
router.post("/create",PostController.create)
router.delete("/id/:_id",PostController.delete)
router.put("/id/:_id",PostController.update)


module.exports = router