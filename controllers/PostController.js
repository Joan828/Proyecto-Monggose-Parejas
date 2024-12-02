const Post = require("../models/Post")

const PostController = {

    async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error);
        }
    },
    async getPostByTitle(req, res) {
        try {
          if(req.params.title.length>20){
            return res.status(400).send('Búsqueda demasiado larga')
          }
          const title = new RegExp(req.params.title, "i");
          const post = await Post.find({title});
          res.send(post);
        } catch (error) {
          console.log(error);
        }
      }
    
    
}

module.exports = PostController