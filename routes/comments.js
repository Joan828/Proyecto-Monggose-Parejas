const express = require("express")
const { authentication } = require("../middleware/authentication")
const CommentController = require("../controllers/CommentController")
const router = express.Router()

router.post("/create", authentication, CommentController.create)
router.get("/getAll", CommentController.getAll)
router.put("/update", CommentController.update)
router.delete("/delete", CommentController.delete)

module.exports = router