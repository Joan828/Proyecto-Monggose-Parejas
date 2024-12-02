const express = require("express")
const PostController = require("../controllers/PostController")
const { authentication, isAuthor } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication,PostController.create)
router.delete("/id/:_id", authentication,PostController.delete)
router.put("/id/:_id", authentication,PostController.update)


module.exports = router