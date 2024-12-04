const express = require("express")
const CommentController = require("../controllers/CommentController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication, CommentController.create)
router.get("/getAll", CommentController.getAll)
router.put("/update", CommentController.update)
router.delete("/delete", CommentController.delete)

module.exports = router