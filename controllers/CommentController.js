const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

const CommentController = {
    async create(req,res){
        const comment = await Comment.create(req.body)
        await User.findByIdAndUpdate(req.user._id, { $push: { commentIds: comment._id } })
        await Post.findByIdAndUpdate(req.body.postId, { $push: { commentIds: comment._id } })

        res.status(201).send({message:"Comment successfully created", comment})
    },
    async getAll(req, res) {
      try {
         const comments = await Comment.find()
         res.send(comments)
      } catch (error) {
          console.error(error);
      }
  },
  async update(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params._id, 
        { ...req.body},
        { new: true }
      )
      res.send({ message: "Comment successfully updated", comment });
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
        const comment = await Comment.findByIdAndDelete(req.params._id)
        res.send({ message: 'Comment deleted', comment })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'there was a problem trying to remove the comment'})
    }
}
    
}

module.exports = CommentController