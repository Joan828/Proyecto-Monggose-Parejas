const Comment = require("../models/Comment")

const CommentController = {

    
    async create(req, res) {
        try {
          const comment = await Comment.create({
            ...req.body,
            userId: req.user._id,
          });
          res.status(201).send(comment);
        } catch (error) {
          console.error(error);
        }
      },
}

module.exports = CommentController