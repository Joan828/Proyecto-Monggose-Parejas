const Comment = require("../models/Comment")
const Post = require("../models/Post")
const User = require("../models/User")

const CommentController = {
    async create(req,res){
      try {
        const comment = await Comment.create({...req.body, userId: req.user._id})      
        await User.findByIdAndUpdate(req.user._id, { $push: { commentIds: comment._id } })
        await Post.findByIdAndUpdate(req.body.postId, { $push: { commentIds: comment._id } })

        res.status(201).send({message:"Comentario creado correctamente", comment})
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Hubo un problema al intentar crear tu comentario'})
      }
 
    },
    async getAll(req, res) {
      try {
         const comments = await Comment.find().sort({createdAt:-1})
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
      res.send({ message: "Comentario actualizado correctamente", comment });
    } catch (error) {
      console.error(error);
    }
  },
  async delete(req, res) {
    try {
        const comment = await Comment.findByIdAndDelete(req.params._id)
        res.send({ message: 'Comentario eliminado', comment })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Hubo un problema al intentar eliminar tu comentario'})
    }
} 
}

module.exports = CommentController