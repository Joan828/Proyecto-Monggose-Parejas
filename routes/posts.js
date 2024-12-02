const express = require("express")
const PostController = require("../controllers/PostController")
const router = express.Router()

router.post("/create",PostController.create)
router.delete("/id/:_id",PostController.delete)
router.put("/id/:_id",PostController.update)


module.exports = router