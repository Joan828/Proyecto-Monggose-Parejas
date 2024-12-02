const Post = require("../models/Post")

const PostController = {
    async create(req,res){
        try {
            const newPost = await Post.create(req.body)
        res.status(201).send({message:"New post successfully created",newPost})
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"There was a problem",error})
        } 
    },
    async delete(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({ message: 'Post deleted', post })
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'there was a problem trying to remove the post'})
        }
    },
    async update(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id, //id del post que quiero actualizar
            req.body,// el objeto con los datos a actualizar 
            { new: true }// para que el post de la respuesta sea el actualizado
        )
          res.send({ message: "post successfully updated", post });
        } catch (error) {
          console.error(error);
        }
      },
}

module.exports = PostController